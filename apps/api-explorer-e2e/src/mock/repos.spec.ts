import { test, expect } from '@playwright/test';

test.describe('Repos page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/repos');
  });

  test('shows loading then user profile and repo list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();

    await expect(page.getByText('angular · 300 public repos')).toBeVisible();
    await expect(page.getByText('angular', { exact: true })).toBeVisible();
    await expect(page.getByText('angular-cli')).toBeVisible();
    await expect(page.getByText('components')).toBeVisible();
    await expect(page.getByText('Deliver web apps with confidence')).toBeVisible();
  });

  test('repo star counts are shown', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await expect(page.getByText('★ 93400')).toBeVisible();
    await expect(page.getByText('★ 26300')).toBeVisible();
    await expect(page.getByText('★ 24100')).toBeVisible();
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

  test('REPOS_LIST_FOR_USER is called with username "angular"', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    const history = await page.evaluate(() =>
      window.__openApiMocks__['REPOS_LIST_FOR_USER'].getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req!.args[0]).toBe('angular');
  });

  test('shows error message when mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await page.evaluate(() => window.__openApiMocks__['REPOS_LIST_FOR_USER'].fail(new Error('500')));
    await expect(page.getByText('Failed to load repos')).toBeVisible();
  });
});
