import { expect, test } from '@playwright/test';

test('product waitlist submits selected interests', async ({ page }) => {
  let submittedBody: unknown = null;

  await page.route('**/api/waitlist', async (route) => {
    submittedBody = route.request().postDataJSON();

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'You are on the Unwired product waitlist.',
      }),
      status: 202,
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
  expect(submittedBody).toMatchObject({
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
  await page.route('**/api/waitlist', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Unable to process waitlist submission.',
      }),
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
