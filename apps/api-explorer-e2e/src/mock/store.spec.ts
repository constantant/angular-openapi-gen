import { test, expect } from '@playwright/test';

test.describe('Store page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/store');
    await expect(page.getByRole('heading', { name: 'Store' })).toBeVisible();
  });

  test('shows inventory counts after loading', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await expect(page.getByText('142')).toBeVisible();
    await expect(page.getByText('available')).toBeVisible();
    await expect(page.getByText('8')).toBeVisible();
    await expect(page.getByText('23')).toBeVisible();
  });

  test('GET_INVENTORY fires on page load', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    const history = await page.evaluate(() => openApiMock('GET_INVENTORY').getHistory());
    expect(history.some((e) => e.type === 'request')).toBe(true);
  });

  test('resolving new inventory data updates the display', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();

    await page.evaluate(() =>
      openApiMock('GET_INVENTORY').resolve({ available: 999, pending: 0, sold: 1 }),
    );

    await expect(page.getByText('999')).toBeVisible();
  });

  test('shows error when inventory fails', async ({ page }) => {
    await expect(page.locator('mat-progress-bar')).toBeHidden();
    await page.evaluate(() => openApiMock('GET_INVENTORY').fail(new Error('500')));
    await expect(page.getByText('Failed to load inventory')).toBeVisible();
  });

  test('place order section is visible', async ({ page }) => {
    await expect(page.getByText('Place Order')).toBeVisible();
    await expect(page.getByLabel('Pet ID')).toBeVisible();
    await expect(page.getByLabel('Quantity')).toBeVisible();
  });

  test('place order shows success with order ID', async ({ page }) => {
    await page.getByLabel('Pet ID').fill('5');
    await page.getByRole('button', { name: 'Place Order' }).click();

    await expect(page.getByText(/Order #100 placed/)).toBeVisible();
  });

  test('PLACE_ORDER is called with petId and quantity', async ({ page }) => {
    await page.getByLabel('Pet ID').fill('7');
    await page.getByLabel('Quantity').fill('3');
    await page.getByRole('button', { name: 'Place Order' }).click();

    await expect(page.getByText(/Order #/)).toBeVisible();
    const history = await page.evaluate(() => openApiMock('PLACE_ORDER').getHistory());
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toMatchObject({ petId: 7, quantity: 3 });
  });

  test('find order section is visible', async ({ page }) => {
    await expect(page.getByText('Find Order by ID')).toBeVisible();
  });

  test('find order shows order details', async ({ page }) => {
    await page.getByLabel('Order ID').fill('1');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.order-card')).toBeVisible();
    await expect(page.getByText('#1')).toBeVisible();
    await expect(page.getByText('placed')).toBeVisible();
  });

  test('GET_ORDER_BY_ID is called with the entered ID', async ({ page }) => {
    await page.getByLabel('Order ID').fill('42');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.order-card')).toBeVisible();
    const history = await page.evaluate(() => openApiMock('GET_ORDER_BY_ID').getHistory());
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toBe('42');
  });
});
