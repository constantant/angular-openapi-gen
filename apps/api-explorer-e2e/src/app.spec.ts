import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows exactly the right nav links', async ({ page }) => {
    const nav = page.locator('mat-sidenav');
    await expect(nav.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Repos' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Pets' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Weather' })).toBeVisible();
  });

  test('active link updates on navigation', async ({ page }) => {
    const nav = page.locator('mat-sidenav');
    await nav.getByRole('link', { name: 'Repos' }).click();
    await expect(nav.getByRole('link', { name: 'Repos' })).toHaveClass(/active/);
    await expect(nav.getByRole('link', { name: 'Dashboard' })).not.toHaveClass(/active/);
  });
});

test.describe('Pages', () => {
  test('dashboard loads with correct heading', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('repos page loads with correct heading', async ({ page }) => {
    await page.goto('/repos');
    await expect(page.getByRole('heading', { name: /repos/i })).toBeVisible();
  });

  test('pets page loads with correct heading', async ({ page }) => {
    await page.goto('/pets');
    await expect(page.getByRole('heading', { name: /pets/i })).toBeVisible();
  });

  test('weather page loads with correct heading', async ({ page }) => {
    await page.goto('/weather');
    await expect(page.getByRole('heading', { name: /weather/i })).toBeVisible();
  });

  test('root redirects to dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
