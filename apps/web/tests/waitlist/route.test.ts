import assert from 'node:assert/strict';
import { test } from 'node:test';

import { POST } from '@/app/api/waitlist/route';

const validSubmission = {
  email: 'person@example.com',
  productInterests: ['unwired-mail'],
  platformInterests: ['macos', 'ios'],
  productUpdateConsent: true,
  sourcePage: '/products/waitlist',
  createdAt: '2026-06-08T13:09:45.000Z',
};

test('POST accepts valid waitlist submissions', async () => {
  const previousFetch = globalThis.fetch;
  const previousEnv = setWaitlistEnv();
  const emailRequests: unknown[] = [];

  globalThis.fetch = async (_input, init) => {
    emailRequests.push(JSON.parse(String(init?.body)));

    return new Response('{}', { status: 200 });
  };

  try {
    const response = await POST(jsonRequest(validSubmission));

    assert.equal(response.status, 202);
    assert.equal(emailRequests.length, 2);
    assert.deepEqual((emailRequests[0] as { readonly to: readonly string[] }).to, [
      'person@example.com',
    ]);
    assert.deepEqual((emailRequests[1] as { readonly to: readonly string[] }).to, [
      'jan@example.com',
    ]);
  } finally {
    restoreWaitlistEnv(previousEnv);
    globalThis.fetch = previousFetch;
  }
});

test('POST rejects invalid submissions before sending email', async () => {
  const previousFetch = globalThis.fetch;
  const previousEnv = setWaitlistEnv();
  let emailRequestCount = 0;

  globalThis.fetch = async () => {
    emailRequestCount += 1;

    return new Response('{}', { status: 200 });
  };

  try {
    const response = await POST(
      jsonRequest({
        ...validSubmission,
        productUpdateConsent: false,
      }),
    );

    assert.equal(response.status, 400);
    assert.equal(emailRequestCount, 0);
  } finally {
    restoreWaitlistEnv(previousEnv);
    globalThis.fetch = previousFetch;
  }
});

function jsonRequest(body: unknown): Request {
  return new Request('https://unwired.dev/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function setWaitlistEnv(): Record<string, string | undefined> {
  const previousEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    WAITLIST_FROM_EMAIL: process.env.WAITLIST_FROM_EMAIL,
    WAITLIST_NOTIFY_EMAIL: process.env.WAITLIST_NOTIFY_EMAIL,
  };

  process.env.RESEND_API_KEY = 'test-key';
  process.env.WAITLIST_FROM_EMAIL = 'Unwired <waitlist@example.com>';
  process.env.WAITLIST_NOTIFY_EMAIL = 'jan@example.com';

  return previousEnv;
}

function restoreWaitlistEnv(previousEnv: Record<string, string | undefined>): void {
  for (const [name, value] of Object.entries(previousEnv)) {
    if (value === undefined) {
      delete process.env[name];
      continue;
    }

    process.env[name] = value;
  }
}
