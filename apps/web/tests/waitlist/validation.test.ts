import { expect, test } from '@playwright/test';

import { validateWaitlistSubmission } from '@/features/waitlist/validation';

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

  expect(result).toEqual({
    ok: true,
    submission: {
      email: 'person@example.com',
      productInterests: ['unwired-mail', 'unwired-calendar'],
      platformInterests: ['macos', 'ios', 'ipados'],
      productUpdateConsent: true,
      sourcePage: '/products/waitlist',
      createdAt: '2026-06-08T13:09:45.000Z',
    },
  });
});

test('rejects submissions without explicit consent', () => {
  const result = validateWaitlistSubmission({
    ...validSubmission,
    productUpdateConsent: false,
  });

  expect(result).toEqual({
    ok: false,
    errors: ['Consent for occasional Unwired product updates is required.'],
  });
});

test('rejects unsupported products and platforms', () => {
  const result = validateWaitlistSubmission({
    ...validSubmission,
    productInterests: ['unwired-mail', 'unwired-suite'],
    platformInterests: ['macos', 'android'],
  });

  expect(result).toEqual({
    ok: false,
    errors: [
      'Product interest must include Unwired Mail, Unwired Calendar, or both.',
      'Platform interest must include macOS, iOS, or iPadOS.',
    ],
  });
});
