import { test, expect } from '@playwright/test';

test.describe('Weather page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/weather');
    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();
  });

  test('shows loading then current conditions and forecast', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    // Temperature is Math.round(18.5) = 19°C; condition defaults to code 0 = 'Clear sky'
    await expect(page.locator('.current-temp')).toContainText('19°C');
    await expect(page.locator('.current-condition')).toContainText('Clear sky');
    await expect(page.locator('.current-wind')).toContainText('12 km/h');
    // Daily forecast: first entry is labelled 'Today'
    await expect(page.getByText('Today')).toBeVisible();
    await expect(page.getByText('Tomorrow')).toBeVisible();
  });

  test('GET_V1_FORECAST is called with Amsterdam coordinates and required fields', async ({
    page,
  }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    const history = await page.evaluate(() =>
      openApiMock('GET_V1_FORECAST').getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    const params = req?.args[0] as Record<string, unknown>;
    expect(params['latitude']).toBe('52.374');
    expect(params['longitude']).toBe('4.89');
    expect(params['timezone']).toBe('Europe/Amsterdam');
    expect(params['forecast_days']).toBe(3);
    expect(params['current']).toContain('temperature_2m');
    expect(params['daily']).toContain('temperature_2m_max');
  });

  test('shows error message when mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.evaluate(() => openApiMock('GET_V1_FORECAST').fail(new Error('503')));
    await expect(page.getByText('Failed to load forecast')).toBeVisible();
  });
});
