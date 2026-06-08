import { test, expect } from '@playwright/test';

test.describe('Dashboard (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('shows all three summary cards after loading', async ({ page }) => {
    await expect(page.locator('mat-progress-bar').first()).toBeVisible();
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();

    await expect(page.getByText('angular · 300 repos')).toBeVisible();
    await expect(page.getByText('3 repos loaded')).toBeVisible();
    await expect(page.getByText('3 pets available')).toBeVisible();
    await expect(page.getByText('18.5°C')).toBeVisible();
  });

  test('FIND_PETS_BY_STATUS is called with status "available"', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    const history = await page.evaluate(() =>
      window.__openApiMocks__['FIND_PETS_BY_STATUS'].getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req!.args[0]).toEqual({ status: 'available' });
  });

  test('USERS_GET_BY_USERNAME is called with username "angular"', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    const history = await page.evaluate(() =>
      window.__openApiMocks__['USERS_GET_BY_USERNAME'].getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req!.args[0]).toBe('angular');
  });

  test('shows API error when GitHub mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await page.evaluate(() => window.__openApiMocks__['USERS_GET_BY_USERNAME'].fail(new Error('401')));
    await expect(page.getByText('API error').first()).toBeVisible();
  });
});
