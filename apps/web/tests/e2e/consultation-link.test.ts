import { expect, test } from '@playwright/test';

const bookingUrl = 'https://cal.eu/jan-silhan-unwired/frontend-consultation';

test('consultation CTAs use the canonical booking page', async ({ page }) => {
  await page.goto('/');

  const servicesSection = page.getByRole('region', {
    name: 'Senior frontend help, without the hand‑off chain.',
  });
  const servicesBookingLink = servicesSection.getByRole('link', {
    name: 'Book a frontend consultation',
  });
  const footerBookingLink = page.getByRole('contentinfo').getByRole('link', {
    name: 'Book a frontend consultation',
  });

  await expect(servicesBookingLink).toHaveAttribute('href', bookingUrl);
  await expect(servicesBookingLink).toHaveAttribute('target', '_blank');
  await expect(footerBookingLink).toHaveAttribute('href', bookingUrl);
  await expect(footerBookingLink).toHaveAttribute('target', '_blank');
  await expect(
    servicesSection.getByText('Booking is handled by Cal.eu.'),
  ).toBeVisible();
  await expect(
    page.getByRole('contentinfo').getByText('Booking is handled by Cal.eu.'),
  ).toBeVisible();
});

test('footer stays within the viewport', async ({ page }) => {
  await page.goto('/');

  const widths = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));

  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
});
