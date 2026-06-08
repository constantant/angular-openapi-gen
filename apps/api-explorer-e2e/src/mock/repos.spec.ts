import { test, expect } from '@playwright/test';

test.describe('Repos page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/repos');
    await expect(page.getByRole('heading', { name: 'Repositories' })).toBeVisible();
  });

  test('shows loading then user profile and repo list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar').first()).toBeVisible();
    await expect(page.locator('mat-progress-bar')).toHaveCount(0);

    await expect(page.getByText('angular · 300 public repos')).toBeVisible();
    await expect(page.locator('mat-list').getByText('angular', { exact: true })).toBeVisible();
    await expect(page.getByText('angular-cli')).toBeVisible();
    await expect(page.locator('mat-list [matlistitemtitle]').getByText('components', { exact: true })).toBeVisible();
    await expect(page.getByText('Deliver web apps with confidence')).toBeVisible();
  });

  test('repo star counts are shown', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toHaveCount(0);
    await expect(page.getByText('★ 93400')).toBeVisible();
    await expect(page.getByText('★ 26300')).toBeVisible();
    await expect(page.getByText('★ 24100')).toBeVisible();
  });

  test('USERS_GET_BY_USERNAME is called with username "angular"', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toHaveCount(0);
    const history = await page.evaluate(() =>
      openApiMock('USERS_GET_BY_USERNAME').getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toBe('angular');
  });

  test('REPOS_LIST_FOR_USER is called with username "angular"', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toHaveCount(0);
    const history = await page.evaluate(() =>
      openApiMock('REPOS_LIST_FOR_USER').getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toBe('angular');
  });

  test('shows error message when mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toHaveCount(0);
    await page.evaluate(() => openApiMock('REPOS_LIST_FOR_USER').fail(new Error('500')));
    await expect(page.getByText('Failed to load repos')).toBeVisible();
  });
});
