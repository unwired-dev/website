import { expect, test } from '@playwright/test';

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

test('Privacy Notice identifies website and Product processing', async ({
  page,
}) => {
  const response = await page.goto('/privacy');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Notice' }),
  ).toBeVisible();
  await expect(page.getByText('Draft for legal review')).toBeVisible();
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
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Trusted Devices and Product Sync' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Mailbox Connections' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Push notifications' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'On-device AI assistance' }),
  ).toBeVisible();
  await expect(
    page.getByText('Provisional draft · 24 August 2026'),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/u,
  );
});

test('Terms of Use publishes the provisional product agreement', async ({
  page,
}) => {
  const response = await page.goto('/terms');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Terms of Use' }),
  ).toBeVisible();
  await expect(page.getByText('Draft for legal review')).toBeVisible();
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
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/u,
  );
});
