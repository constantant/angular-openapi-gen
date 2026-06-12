import { test, expect } from '@playwright/test';

test.describe('User page (mock)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/user');
    await expect(page.getByRole('heading', { name: 'User' })).toBeVisible();
  });

  test('shows login form when not logged in', async ({ page }) => {
    const session = page.locator('section').filter({ hasText: 'Session' });
    await expect(session.getByLabel('Username')).toBeVisible();
    await expect(session.getByLabel('Password')).toBeVisible();
    await expect(session.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('login resolves session and shows logout button', async ({ page }) => {
    const session = page.locator('section').filter({ hasText: 'Session' });
    await session.getByLabel('Username').fill('user1');
    await session.getByLabel('Password').fill('pass1');
    await session.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Session active')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('LOGIN_USER is called with the entered credentials', async ({ page }) => {
    const session = page.locator('section').filter({ hasText: 'Session' });
    await session.getByLabel('Username').fill('testuser');
    await session.getByLabel('Password').fill('secret');
    await session.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Session active')).toBeVisible();
    const history = await page.evaluate(() => openApiMock('LOGIN_USER').getHistory());
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toMatchObject({ username: 'testuser', password: 'secret' });
  });

  test('logout clears session and restores login form', async ({ page }) => {
    const session = page.locator('section').filter({ hasText: 'Session' });
    await session.getByLabel('Username').fill('user1');
    await session.getByLabel('Password').fill('pass1');
    await session.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Session active')).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(session.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('find user section is visible', async ({ page }) => {
    await expect(page.getByText('Find User')).toBeVisible();
    await expect(page.getByPlaceholder('e.g. user1')).toBeVisible();
  });

  test('find user shows user card with details', async ({ page }) => {
    await page.getByPlaceholder('e.g. user1').fill('john');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.user-card')).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('@john')).toBeVisible();
    await expect(page.getByText('john@example.com')).toBeVisible();
  });

  test('GET_USER_BY_NAME is called with the entered username', async ({ page }) => {
    await page.getByPlaceholder('e.g. user1').fill('alice');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.user-card')).toBeVisible();
    const history = await page.evaluate(() => openApiMock('GET_USER_BY_NAME').getHistory());
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toBe('alice');
  });

  test('create user section is visible', async ({ page }) => {
    await expect(page.getByText('Create User')).toBeVisible();
    await expect(page.getByLabel('Username *')).toBeVisible();
  });

  test('create user shows success feedback', async ({ page }) => {
    await page.getByLabel('Username *').fill('newuser');
    await page.getByRole('button', { name: 'Create User' }).click();

    await expect(page.getByText('User created')).toBeVisible();
  });

  test('CREATE_USER is called with the entered username', async ({ page }) => {
    await page.getByLabel('Username *').fill('charlie');
    await page.getByLabel('First name').fill('Charlie');
    await page.getByLabel('Email').fill('charlie@example.com');
    await page.getByRole('button', { name: 'Create User' }).click();

    await expect(page.getByText('User created')).toBeVisible();
    const history = await page.evaluate(() => openApiMock('CREATE_USER').getHistory());
    const req = history.find((e) => e.type === 'request');
    expect(req).toBeTruthy();
    expect(req?.args[0]).toMatchObject({ username: 'charlie', firstName: 'Charlie', email: 'charlie@example.com' });
  });
});
