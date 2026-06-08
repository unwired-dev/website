import { expect, test } from '@playwright/test';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function findPayloadWithEmail(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const payload = findPayloadWithEmail(item);

      if (payload) {
        return payload;
      }
    }

    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  if (value.email === 'person@example.com') {
    return value;
  }

  for (const item of Object.values(value)) {
    const payload = findPayloadWithEmail(item);

    if (payload) {
      return payload;
    }
  }

  return null;
}

test('product waitlist submits selected interests', async ({ page }) => {
  let submittedBody: unknown = null;

  await page.route('**/api/trpc/**', async (route) => {
    expect(route.request().url()).toContain('waitlist.join');
    submittedBody = route.request().postDataJSON();

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        {
          result: {
            data: {
              message: 'You are on the Unwired product waitlist.',
            },
          },
        },
      ]),
      status: 200,
    });
  });

  await page.goto('/products/waitlist');

  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill('person@example.com');
  await page.getByLabel('Unwired Mail').check();
  await page.getByLabel('Unwired Calendar').check();
  await page.getByLabel('macOS').check();
  await page.getByLabel('iOS').check();
  await page
    .getByLabel('Consent for occasional Unwired product updates')
    .check();

  await page.getByRole('button', { name: 'Join product waitlist' }).click();

  await expect(
    page.getByText('You are on the Unwired product waitlist.'),
  ).toBeVisible();

  const submittedPayload = findPayloadWithEmail(submittedBody);

  expect(submittedPayload).toMatchObject({
    email: 'person@example.com',
    productInterests: ['unwired-mail', 'unwired-calendar'],
    platformInterests: ['macos', 'ios'],
    productUpdateConsent: true,
    sourcePage: '/products/waitlist',
  });
});

test('product waitlist shows errors without losing values', async ({
  page,
}) => {
  await page.route('**/api/trpc/**', async (route) => {
    expect(route.request().url()).toContain('waitlist.join');

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        {
          error: {
            message: 'Unable to process waitlist submission.',
            code: -32_603,
            data: {
              code: 'BAD_GATEWAY',
              httpStatus: 502,
              path: 'waitlist.join',
            },
          },
        },
      ]),
      status: 502,
    });
  });

  await page.goto('/products/waitlist');

  const emailInput = page.getByRole('textbox', { name: 'Email address' });
  const mailInput = page.getByLabel('Unwired Mail');
  const macosInput = page.getByLabel('macOS');

  await emailInput.fill('person@example.com');
  await mailInput.check();
  await macosInput.check();
  await page
    .getByLabel('Consent for occasional Unwired product updates')
    .check();

  await page.getByRole('button', { name: 'Join product waitlist' }).click();

  await expect(
    page.getByText('Unable to process waitlist submission.'),
  ).toBeVisible();
  await expect(emailInput).toHaveValue('person@example.com');
  await expect(mailInput).toBeChecked();
  await expect(macosInput).toBeChecked();
});
