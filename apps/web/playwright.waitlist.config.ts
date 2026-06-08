import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/waitlist',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: 'list',
});
