import { test, expect } from '@playwright/test';

test.describe('YouTube page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/youtube');
  });

  test('YOUTUBE_SEARCH_LIST initial request resolves lambda to undefined (query not yet set)', async ({
    page,
  }) => {
    // query() starts as '' — the component's lambda returns undefined to suppress the resource.
    // Asserting undefined here confirms the suppression logic is wired correctly.
    const history = await page.evaluate(() =>
      openApiMock('YOUTUBE_SEARCH_LIST').getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req!.args[0]).toBeUndefined();
  });

  test('shows Connected hint because API key is pre-set in mock config', async ({ page }) => {
    await expect(page.getByText('Connected')).toBeVisible();
  });

  test('shows search hint before query is submitted', async ({ page }) => {
    await expect(page.getByText('Type a query and press Search.')).toBeVisible();
  });

  test('shows results after submitting a search', async ({ page }) => {
    // input is pre-filled with "Angular" — just click Search
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('mat-progress-bar')).not.toBeVisible();

    await expect(page.getByText('Angular in 100 Seconds')).toBeVisible();
    await expect(page.getByText('Angular Signals are here!')).toBeVisible();
    await expect(page.getByText('Angular 22 New Features')).toBeVisible();
  });

  test('shows total result count after search', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await expect(page.getByText(/About.*results for "Angular"/)).toBeVisible();
  });

  test('shows error message when mock fails after search', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await page.evaluate(() =>
      openApiMock('YOUTUBE_SEARCH_LIST').fail({ message: 'API quota exceeded' }),
    );
    await expect(page.getByText('API quota exceeded')).toBeVisible();
  });
});
