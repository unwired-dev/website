import { expect, test } from '@playwright/test';

test('Mail privacy is public and separate from the Company Website notice', async ({
  page,
}) => {
  await page.goto('/unwired-mail');
  await page
    .getByRole('link', { name: 'Unwired Mail Privacy Notice', exact: true })
    .click();

  await expect(page).toHaveURL(/\/unwired-mail\/privacy$/u);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Mail Privacy Notice' }),
  ).toBeVisible();
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: 'Google API Services User Data Policy' }),
  ).toHaveAttribute(
    'href',
    'https://developers.google.com/terms/api-services-user-data-policy',
  );
  await expect(
    page.getByRole('link', { name: 'Google Account third-party connections' }),
  ).toHaveAttribute('href', 'https://myaccount.google.com/connections');
  await page
    .getByRole('link', { name: 'Company Website Privacy Notice', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/privacy$/u);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Privacy Notice',
      exact: true,
    }),
  ).toBeVisible();
});

test('footer exposes the legal entity and legal documents', async ({
  page,
}) => {
  await page.goto('/');

  const footer = page.getByRole('contentinfo');

  await expect(
    footer.getByText('Unwired, s.r.o.', { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText('Soběšická 184/36, Husovice, 614 00 Brno, Czech Republic'),
  ).toBeVisible();
  await expect(footer.getByText('IČO 19711131')).toBeVisible();
  await expect(footer.getByText('DIČ CZ19711131')).toBeVisible();
  await expect(
    footer.getByText(
      'Registered in the Commercial Register maintained by the Regional Court in Brno, section C, file 135646.',
    ),
  ).toBeVisible();
  await expect(
    footer.getByRole('link', { name: 'Privacy Notice', exact: true }),
  ).toHaveAttribute('href', '/privacy');
  await expect(
    footer.getByRole('link', { name: 'Terms of Use', exact: true }),
  ).toHaveAttribute('href', '/terms');
});

test('Privacy Notice identifies current website processing', async ({
  page,
}) => {
  const response = await page.goto('/privacy');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Notice' }),
  ).toBeVisible();
  await expect(page.getByText('Draft for legal review')).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Product waitlist' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Consultation bookings' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Your rights' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Product Accounts and sign-in' }),
  ).toHaveCount(0);
  await expect(page.getByText('Provisional · 27 August 2026')).toBeVisible();
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(0);
});

test('Terms of Use publishes the prospective product agreement', async ({
  page,
}) => {
  const response = await page.goto('/terms');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Terms of Use' }),
  ).toBeVisible();
  await expect(page.getByText('Draft for legal review')).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Product licence' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'AI assistance' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Consumer rights' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Governing law and disputes' }),
  ).toBeVisible();
  await expect(page.getByText('Prospective · 27 August 2026')).toBeVisible();
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(0);
});
