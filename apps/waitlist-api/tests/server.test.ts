import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createWaitlistApiServer } from '../src/server.js';

const validSubmission = {
  email: 'person@example.com',
  productInterests: ['unwired-mail'],
  platformInterests: ['macos', 'ios'],
  productUpdateConsent: true,
  sourcePage: '/products/waitlist',
  createdAt: '2026-06-08T13:09:45.000Z',
};

test('POST /waitlist sends a Resend confirmation', async () => {
  const emailRequests: unknown[] = [];
  const server = createWaitlistApiServer({
    env: {
      RESEND_API_KEY: 'test-key',
      WAITLIST_FROM_EMAIL: 'Unwired <waitlist@example.com>',
      WAITLIST_NOTIFY_EMAIL: 'jan@example.com',
    },
    fetchImplementation: async (_input, init) => {
      emailRequests.push(JSON.parse(String(init?.body)));

      return new Response('{}', { status: 200 });
    },
  });

  const url = await listen(server);

  try {
    const response = await fetch(`${url}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validSubmission),
    });

    assert.equal(response.status, 202);
    assert.equal(emailRequests.length, 2);
    assert.deepEqual((emailRequests[0] as { readonly to: readonly string[] }).to, [
      'person@example.com',
    ]);
    assert.deepEqual((emailRequests[1] as { readonly to: readonly string[] }).to, [
      'jan@example.com',
    ]);
  } finally {
    await close(server);
  }
});

test('POST /waitlist rejects invalid submissions before sending email', async () => {
  let emailRequestCount = 0;
  const server = createWaitlistApiServer({
    env: {
      RESEND_API_KEY: 'test-key',
      WAITLIST_FROM_EMAIL: 'Unwired <waitlist@example.com>',
      WAITLIST_NOTIFY_EMAIL: 'jan@example.com',
    },
    fetchImplementation: async () => {
      emailRequestCount += 1;

      return new Response('{}', { status: 200 });
    },
  });

  const url = await listen(server);

  try {
    const response = await fetch(`${url}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...validSubmission,
        productUpdateConsent: false,
      }),
    });

    assert.equal(response.status, 400);
    assert.equal(emailRequestCount, 0);
  } finally {
    await close(server);
  }
});

function listen(server: ReturnType<typeof createWaitlistApiServer>): Promise<string> {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();

      assert.equal(typeof address, 'object');
      assert.notEqual(address, null);

      if (typeof address === 'object' && address !== null) {
        resolve(`http://127.0.0.1:${address.port}`);
      }
    });
  });
}

function close(server: ReturnType<typeof createWaitlistApiServer>): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
