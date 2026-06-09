import { test, expect } from '@playwright/test';

test('renders the API Mocks toolbar', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('mat-toolbar .brand')).toContainText('API Mocks');
});
