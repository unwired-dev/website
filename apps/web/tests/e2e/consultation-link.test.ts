import { expect, test } from '@playwright/test';

const bookingUrl = 'https://cal.com/jan-silhan-unwired/frontend-consultation';

test('consultation CTAs use the canonical booking page', async ({ page }) => {
  await page.goto('/');

  const servicesSection = page.getByRole('region', {
    name: 'Senior frontend help, without the hand‑off chain.',
  });
  const bookingLink = servicesSection.getByRole('link', {
    name: 'Book a frontend consultation',
  });

  await expect(bookingLink).toHaveAttribute('href', bookingUrl);
  await expect(bookingLink).toHaveAttribute('target', '_blank');
});
