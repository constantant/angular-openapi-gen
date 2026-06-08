import { test, expect } from '@playwright/test';

// FIND_PETS_BY_STATUS on the pets page receives a reactive lambda (() => ({status})),
// which is not JSON-serializable — request params are not asserted here.

test.describe('Pets page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pets');
  });

  test('shows loading then pet list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();

    await expect(page.getByText('Rex')).toBeVisible();
    await expect(page.getByText('Luna')).toBeVisible();
    await expect(page.getByText('Buddy')).toBeVisible();
  });

  test('status filter chips are rendered', async ({ page }) => {
    await expect(page.getByRole('option', { name: 'available' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'pending' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'sold' })).toBeVisible();
  });

  test('resolving new mock data via window API updates the list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();

    await page.evaluate(() =>
      window.__openApiMocks__['FIND_PETS_BY_STATUS'].resolve([
        { id: 10, name: 'Shadow', status: 'pending', photoUrls: [] },
        { id: 11, name: 'Ghost', status: 'pending', photoUrls: [] },
      ]),
    );

    await expect(page.getByText('Shadow')).toBeVisible();
    await expect(page.getByText('Ghost')).toBeVisible();
    await expect(page.getByText('Rex')).not.toBeVisible();
  });

  test('shows loading state when mock is set to loading', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await page.evaluate(() => window.__openApiMocks__['FIND_PETS_BY_STATUS'].setLoading());
    await expect(page.locator('mat-progress-bar')).toBeVisible();
  });

  test('shows error message when mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).not.toBeVisible();
    await page.evaluate(() => window.__openApiMocks__['FIND_PETS_BY_STATUS'].fail(new Error('500')));
    await expect(page.getByText('Failed to load pets')).toBeVisible();
  });
});
