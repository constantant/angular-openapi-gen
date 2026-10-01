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
    await expect(page.getByText("Backend response doesn't match its own API spec — 500")).toBeVisible();
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

  // UPLOAD_FILE is an HttpClient token generated with --reportProgress: it yields
  // Observable<HttpEvent<T>>, so the mock emits Sent / UploadProgress / Response events.
  // Catch mode (set via the same control event the DevTools extension uses, since the key is
  // only registered once the token is first called) holds the request open so the test can
  // drive progress deterministically.
  const startHeldUpload = async (page: import('@playwright/test').Page) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.evaluate(() =>
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', { detail: { key: 'UPLOAD_FILE', action: 'setCatchMode' } }),
      ),
    );
    await page.getByText('Rex').click();
    await page.locator('input[type="file"]').setInputFiles({
      name: 'photo.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image'),
    });
    await page.locator('.detail-upload button[mat-flat-button]').click();
  };

  test('upload shows live progress, then success', async ({ page }) => {
    await startHeldUpload(page);

    const bar = page.getByTestId('upload-progress');
    const text = page.getByTestId('upload-progress-text');
    await expect(bar).toBeVisible();
    await expect(text).toContainText('Starting');

    await page.evaluate(() => openApiMock('UPLOAD_FILE').setProgress('upload', 1_000_000, 4_000_000));
    await expect(bar).toHaveAttribute('aria-valuenow', '25');
    await expect(text).toContainText('25%');
    await expect(text).toContainText('976.6 KB / 3.8 MB');

    await page.evaluate(() => openApiMock('UPLOAD_FILE').setProgress('upload', 3_000_000, 4_000_000));
    await expect(bar).toHaveAttribute('aria-valuenow', '75');

    await page.evaluate(() =>
      openApiMock('UPLOAD_FILE').resolve({ code: 200, type: 'unknown', message: 'Photo stored' }),
    );
    await expect(page.locator('.upload-ok')).toContainText('Photo stored');
    await expect(bar).toBeHidden();
  });

  test('simulateProgress animates the bar to completion', async ({ page }) => {
    await startHeldUpload(page);
    await expect(page.getByTestId('upload-progress')).toBeVisible();

    await page.evaluate(() =>
      openApiMock('UPLOAD_FILE').simulateProgress('upload', 4_000_000, 800, {
        code: 200,
        type: 'unknown',
        message: 'Animated upload done',
      }),
    );
    await expect(page.locator('.upload-ok')).toContainText('Animated upload done');
    await expect(page.getByTestId('upload-progress')).toBeHidden();
  });

  test('a failed upload says where it stopped', async ({ page }) => {
    await startHeldUpload(page);
    await expect(page.getByTestId('upload-progress')).toBeVisible();

    await page.evaluate(() => openApiMock('UPLOAD_FILE').setProgress('upload', 1_000_000, 4_000_000));
    await expect(page.getByTestId('upload-progress')).toHaveAttribute('aria-valuenow', '25');
    await page.evaluate(() => openApiMock('UPLOAD_FILE').fail(new Error('connection reset')));

    await expect(page.locator('.upload-err')).toContainText('Upload failed at 25%.');
    await expect(page.getByTestId('upload-progress')).toBeHidden();
  });

  test('cancelling aborts the upload and ignores a late response', async ({ page }) => {
    await startHeldUpload(page);
    await expect(page.getByTestId('upload-progress')).toBeVisible();

    await page.getByTestId('upload-cancel').click();
    await expect(page.locator('.upload-err')).toContainText('Upload cancelled.');
    await expect(page.getByTestId('upload-progress')).toBeHidden();

    await page.evaluate(() =>
      openApiMock('UPLOAD_FILE').resolve({ code: 200, type: 'unknown', message: 'too late' }),
    );
    await expect(page.locator('.upload-ok')).toHaveCount(0);
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
