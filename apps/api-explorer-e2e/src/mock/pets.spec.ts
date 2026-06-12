import { test, expect } from '@playwright/test';

test.describe('Pets page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pets');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('shows loading then pet list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeVisible();
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await expect(page.getByText('Rex')).toBeVisible();
    await expect(page.getByText('Luna')).toBeVisible();
    await expect(page.getByText('Buddy')).toBeVisible();
  });

  test('FIND_PETS_BY_STATUS initial request resolves lambda to default status "available"', async ({
    page,
  }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    const history = await page.evaluate(() =>
      openApiMock('FIND_PETS_BY_STATUS').getHistory(),
    );
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toEqual({ status: 'available' });
  });

  test('status filter chips are rendered', async ({ page }) => {
    await expect(page.getByRole('option', { name: 'available' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'pending' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'sold' })).toBeVisible();
  });

  test('resolving new mock data via window API updates the list', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await page.evaluate(() =>
      openApiMock('FIND_PETS_BY_STATUS').resolve([
        { id: 10, name: 'Shadow', status: 'pending', photoUrls: [] },
        { id: 11, name: 'Ghost', status: 'pending', photoUrls: [] },
      ]),
    );

    await expect(page.getByText('Shadow')).toBeVisible();
    await expect(page.getByText('Ghost')).toBeVisible();
    await expect(page.getByText('Rex')).toBeHidden();
  });

  test('shows loading state when mock is set to loading', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').setLoading());
    await expect(page.locator('mat-progress-bar')).toBeVisible();
  });

  test('shows error message when mock fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').fail(new Error('500')));
    await expect(page.getByText('Failed to load pets')).toBeVisible();
  });

  test('upload section is visible when a pet is selected', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.getByText('Rex').click();
    await expect(page.locator('.detail-upload')).toBeVisible();
  });

  test('upload button is disabled until a file is chosen', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.getByText('Rex').click();
    await expect(page.locator('.detail-upload')).toBeVisible();

    const uploadBtn = page.locator('.detail-upload button[mat-flat-button]');
    await expect(uploadBtn).toBeDisabled();

    await page.locator('input[type="file"]').setInputFiles({
      name: 'photo.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image'),
    });

    await expect(uploadBtn).toBeEnabled();
  });

  test('upload photo shows success feedback', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.getByText('Rex').click();
    await expect(page.locator('.detail-upload')).toBeVisible();

    await page.locator('input[type="file"]').setInputFiles({
      name: 'photo.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image'),
    });

    await page.locator('.detail-upload button[mat-flat-button]').click();
    await expect(page.locator('.upload-ok')).toBeVisible();
    await expect(page.locator('.upload-ok')).toContainText('File uploaded successfully');
  });

  test('UPLOAD_FILE is called with the correct petId', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.getByText('Rex').click();
    await expect(page.locator('.detail-upload')).toBeVisible();

    await page.locator('input[type="file"]').setInputFiles({
      name: 'photo.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image'),
    });

    await page.locator('.detail-upload button[mat-flat-button]').click();
    await expect(page.locator('.upload-ok')).toBeVisible();

    const history = await page.evaluate(() => openApiMock('UPLOAD_FILE').getHistory());
    const req = history.find((e: { type: string }) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toBe('1');
  });
});
