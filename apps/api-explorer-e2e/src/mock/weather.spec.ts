import { test, expect } from '@playwright/test';

test.describe('Weather page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/weather');
    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();
  });

  test('shows loading then current conditions and forecast', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await expect(page.getByText('Temperature: 18.5°C')).toBeVisible();
    await expect(page.getByText('Wind: 12 km/h')).toBeVisible();
    await expect(page.getByText('Current conditions')).toBeVisible();
    await expect(page.getByText('3-day forecast')).toBeVisible();
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
