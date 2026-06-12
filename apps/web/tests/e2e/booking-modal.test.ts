import { expect, test } from '@playwright/test';

const bookingPath = '/jan-silhan-unwired/frontend-consultation';

function expectPresent<T>(value: T | null): asserts value is T {
  expect(value).not.toBeNull();
}

test.beforeEach(async ({ page }) => {
  await page.route('https://cal.*/*', async (route) => {
    const requestUrl = new URL(route.request().url());

    if (!requestUrl.pathname.includes(bookingPath)) {
      await route.continue();
      return;
    }

    await route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html><body><main>Mock Cal scheduler</main></body></html>',
    });
  });
});

test('booking CTA opens a centered lazy modal with fallback contact', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('iframe')).toHaveCount(0);

  const servicesSection = page.getByRole('region', {
    name: 'Senior frontend consultancy for product teams.',
  });
  const bookingButton = servicesSection.getByRole('button', {
    name: 'Book a frontend consultation',
  });

  await bookingButton.click();

  const modal = page.getByRole('dialog', {
    name: 'Book a frontend consultation',
  });
  await expect(modal).toBeVisible();

  const iframe = page.locator(
    'iframe[title="Cal.com scheduler for frontend consultation"]',
  );
  await expect(iframe).toHaveAttribute('src', new RegExp(bookingPath, 'u'));
  await expect(
    page.getByRole('link', { name: 'Email silhan@unwired.dev' }),
  ).toHaveAttribute('href', 'mailto:silhan@unwired.dev');

  const modalBox = await modal.boundingBox();
  const viewport = page.viewportSize();

  expectPresent(modalBox);
  expectPresent(viewport);

  const modalCenterX = modalBox.x + modalBox.width / 2;
  const modalCenterY = modalBox.y + modalBox.height / 2;

  expect(Math.abs(modalCenterX - viewport.width / 2)).toBeLessThanOrEqual(2);
  expect(Math.abs(modalCenterY - viewport.height / 2)).toBeLessThanOrEqual(2);

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(bookingButton).toBeFocused();
});
