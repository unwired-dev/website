import assert from 'node:assert/strict';
import { test } from 'node:test';

import { validateWaitlistSubmission } from '../src/validation.js';

const validSubmission = {
  email: 'Person@Example.com',
  productInterests: ['unwired-mail', 'unwired-calendar'],
  platformInterests: ['macos', 'ios', 'ipados'],
  productUpdateConsent: true,
  sourcePage: '/products/waitlist',
  createdAt: '2026-06-08T13:09:45.000Z',
};

test('accepts a complete waitlist submission', () => {
  const result = validateWaitlistSubmission(validSubmission);

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.equal(result.submission.email, 'person@example.com');
    assert.deepEqual(result.submission.productInterests, ['unwired-mail', 'unwired-calendar']);
    assert.deepEqual(result.submission.platformInterests, ['macos', 'ios', 'ipados']);
  }
});

test('rejects submissions without explicit consent', () => {
  const result = validateWaitlistSubmission({
    ...validSubmission,
    productUpdateConsent: false,
  });

  assert.equal(result.ok, false);

  if (!result.ok) {
    assert.match(result.errors.join('\n'), /Consent/);
  }
});

test('rejects unsupported products and platforms', () => {
  const result = validateWaitlistSubmission({
    ...validSubmission,
    productInterests: ['unwired-mail', 'unwired-suite'],
    platformInterests: ['macos', 'android'],
  });

  assert.equal(result.ok, false);

  if (!result.ok) {
    assert.equal(result.errors.length, 2);
  }
});
