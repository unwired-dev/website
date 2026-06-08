import { expect, test } from '@playwright/test';

import { createWaitlistPostHandler } from '@/app/api/waitlist/route';

interface ResendEmailRequest {
  readonly to: readonly string[];
}

const validSubmission = {
  email: 'person@example.com',
  productInterests: ['unwired-mail'],
  platformInterests: ['macos', 'ios'],
  productUpdateConsent: true,
  sourcePage: '/products/waitlist',
  createdAt: '2026-06-08T13:09:45.000Z',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isResendEmailRequest(value: unknown): value is ResendEmailRequest {
  return (
    isRecord(value) &&
    Array.isArray(value.to) &&
    value.to.every((recipient) => typeof recipient === 'string')
  );
}

function readEmailRequest(init: RequestInit | undefined): ResendEmailRequest {
  const body = init?.body;

  expect(typeof body).toBe('string');

  if (typeof body !== 'string') {
    throw new TypeError('Expected Resend request body to be a string.');
  }

  const parsedBody: unknown = JSON.parse(body);

  if (!isResendEmailRequest(parsedBody)) {
    throw new TypeError('Expected Resend request body to include recipients.');
  }

  return parsedBody;
}

function jsonRequest(body: unknown): Request {
  return new Request('https://unwired.dev/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function createTestPostHandler(
  fetchImplementation: typeof fetch,
): (request: Request) => Promise<Response> {
  return createWaitlistPostHandler({
    env: {
      RESEND_API_KEY: 'test-key',
      WAITLIST_FROM_EMAIL: 'Unwired <waitlist@example.com>',
      WAITLIST_NOTIFY_EMAIL: 'jan@example.com',
    },
    fetchImplementation,
  });
}

test('POST accepts valid waitlist submissions', async () => {
  const emailRequests: ResendEmailRequest[] = [];
  const post = createTestPostHandler(async (_input, init) => {
    emailRequests.push(readEmailRequest(init));

    return new Response('{}', { status: 200 });
  });

  const response = await post(jsonRequest(validSubmission));

  expect(response.status).toBe(202);
  expect(emailRequests).toHaveLength(2);
  expect(emailRequests[0]?.to).toEqual(['person@example.com']);
  expect(emailRequests[1]?.to).toEqual(['jan@example.com']);
});

test('POST rejects invalid submissions before sending email', async () => {
  let emailRequestCount = 0;
  const post = createTestPostHandler(async () => {
    emailRequestCount += 1;

    return new Response('{}', { status: 200 });
  });

  const response = await post(
    jsonRequest({
      ...validSubmission,
      productUpdateConsent: false,
    }),
  );

  expect(response.status).toBe(400);
  expect(emailRequestCount).toBe(0);
});
