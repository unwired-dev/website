import { expect, test } from '@playwright/test';

import type { WaitlistSubmission } from '@/features/waitlist/validation';

import { appRouter } from '@/server/routers/root';
import { createCallerFactory } from '@/server/trpc';

interface ResendEmailRequest {
  readonly to: readonly string[];
}

const validSubmission: WaitlistSubmission = {
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

const createCaller = createCallerFactory(appRouter);

function createTestCaller(fetchImplementation: typeof fetch) {
  return createCaller({
    env: {
      RESEND_API_KEY: 'test-key',
      WAITLIST_FROM_EMAIL: 'Unwired <waitlist@example.com>',
      WAITLIST_NOTIFY_EMAIL: 'jan@example.com',
    },
    fetchImplementation,
  });
}

test('waitlist.join accepts valid waitlist submissions', async () => {
  const emailRequests: ResendEmailRequest[] = [];
  const caller = createTestCaller(async (_input, init) => {
    emailRequests.push(readEmailRequest(init));

    return new Response('{}', { status: 200 });
  });

  const response = await caller.waitlist.join(validSubmission);

  expect(response).toEqual({
    message: 'You are on the Unwired product waitlist.',
  });
  expect(emailRequests).toHaveLength(2);
  expect(emailRequests[0]?.to).toEqual(['person@example.com']);
  expect(emailRequests[1]?.to).toEqual(['jan@example.com']);
});

test('waitlist.join rejects invalid submissions before sending email', async () => {
  let emailRequestCount = 0;
  const caller = createTestCaller(async () => {
    emailRequestCount += 1;

    return new Response('{}', { status: 200 });
  });
  const invalidSubmission = JSON.parse(`{
    "email": "person@example.com",
    "productInterests": ["unwired-mail"],
    "platformInterests": ["macos", "ios"],
    "productUpdateConsent": false,
    "sourcePage": "/products/waitlist",
    "createdAt": "2026-06-08T13:09:45.000Z"
  }`);

  await expect(caller.waitlist.join(invalidSubmission)).rejects.toThrow(
    'Consent for occasional Unwired product updates',
  );

  expect(emailRequestCount).toBe(0);
});
