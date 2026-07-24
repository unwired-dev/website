import { expect, test } from '@playwright/test';

test('footer exposes the legal entity and Privacy Notice', async ({ page }) => {
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
});

test('Privacy Notice identifies processing and data-subject rights', async ({
  page,
}) => {
  await page.goto('/privacy');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Notice' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Product waitlist' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Consultation bookings' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Your rights' }),
  ).toBeVisible();
  await expect(page.getByText('24 July 2026')).toBeVisible();
});
