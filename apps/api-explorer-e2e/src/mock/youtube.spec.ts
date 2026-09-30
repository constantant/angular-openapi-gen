import { test, expect } from '@playwright/test';

test.describe('YouTube page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/youtube');
  });

  test('YOUTUBE_SEARCH_LIST makes no request until a query is submitted', async ({ page }) => {
    // query() starts as '' — the rxResource's params return undefined, so it stays idle and
    // the HttpClient token is never called (nothing is registered on the bus yet).
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    const registered = await page.evaluate(() => 'YOUTUBE_SEARCH_LIST' in (window.__openApiMocks__ ?? {}));
    expect(registered).toBe(false);

    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Angular in 100 Seconds')).toBeVisible();
    const history = await page.evaluate(() => openApiMock('YOUTUBE_SEARCH_LIST').getHistory());
    expect(history.filter((e) => e.type === 'request')).toHaveLength(1);
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

    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await expect(page.getByText('Angular in 100 Seconds')).toBeVisible();
    await expect(page.getByText('Angular Signals are here!')).toBeVisible();
    await expect(page.getByText('Angular 22 New Features')).toBeVisible();
  });

  test('shows total result count after search', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await expect(page.getByText(/About.*results for "Angular"/)).toBeVisible();
  });

  test('shows error message when mock fails after search', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    // HttpClient (Observable) token: fail it while the request is still in flight.
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await page.evaluate(() =>
      openApiMock('YOUTUBE_SEARCH_LIST').fail(new Error('API quota exceeded')),
    );
    await expect(
      page.getByText("Backend response doesn't match its own API spec — API quota exceeded"),
    ).toBeVisible();
  });
});
