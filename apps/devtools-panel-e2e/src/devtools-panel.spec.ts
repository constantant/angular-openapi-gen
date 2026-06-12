import { test, expect } from '@playwright/test';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const MANIFEST = {
  specId: 'test-api',
  mocks: [
    { tokenName: 'GET_PETS', operationId: 'getPets', path: '/pets', method: 'get', tag: 'pets' },
    { tokenName: 'CREATE_PET', operationId: 'createPet', path: '/pets', method: 'post', tag: 'pets' },
  ],
};

const OPENAPI_SPEC = {
  openapi: '3.0.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/pets': {
      get: {
        operationId: 'getPets',
        tags: ['pets'],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                        },
                        required: ['id', 'name'],
                      },
                    },
                  },
                  required: ['items'],
                },
              },
            },
          },
        },
      },
      post: {
        operationId: 'createPet',
        tags: ['pets'],
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'integer' }, name: { type: 'string' } },
                  required: ['id', 'name'],
                },
              },
            },
          },
        },
      },
    },
  },
};

const MANIFEST_URL = 'https://fixtures.test/manifest.json';
const SPEC_URL = 'https://fixtures.test/openapi.json';

// ── Helpers ───────────────────────────────────────────────────────────────────

async function openSpecsTab(page: import('@playwright/test').Page) {
  await page.click('button[mat-tab-link]:has-text("Specs")');
}

async function routeManifest(page: import('@playwright/test').Page) {
  await page.route(MANIFEST_URL, (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify(MANIFEST) }),
  );
}

async function routeOpenApiSpec(page: import('@playwright/test').Page) {
  await page.route(SPEC_URL, (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify(OPENAPI_SPEC) }),
  );
}

async function typeAndFetch(page: import('@playwright/test').Page, url: string) {
  await page.click('button:has-text("+ URL")');
  await page.fill('.url-row .url-input', url);
  await page.click('.url-row button:has-text("Fetch")');
}

async function addManifestViaUrl(page: import('@playwright/test').Page) {
  await routeManifest(page);
  await openSpecsTab(page);
  await typeAndFetch(page, MANIFEST_URL);
  await expect(page.locator('.spec-id')).toBeVisible();
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test.describe('DevTools Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Layout & toolbar ───────────────────────────────────────────────────────

  test('toolbar shows "API Mocks" brand', async ({ page }) => {
    await expect(page.locator('mat-toolbar .brand')).toContainText('API Mocks');
  });

  test('toolbar shows action buttons', async ({ page }) => {
    await expect(page.locator('mat-toolbar button:has-text("↺ Refresh")')).toBeVisible();
    await expect(page.locator('mat-toolbar button:has-text("⏸ Catch All")')).toBeVisible();
    await expect(page.locator('mat-toolbar button:has-text("Clear")')).toBeVisible();
    await expect(page.locator('mat-toolbar button:has-text("Reset All")')).toBeVisible();
  });

  test('toolbar shows mock count', async ({ page }) => {
    await expect(page.locator('mat-toolbar .count')).toContainText('no mocks');
  });

  test('Mocks tab shows filter input', async ({ page }) => {
    await expect(page.locator('.mocks-filter input[placeholder="Filter…"]')).toBeVisible();
  });

  // ── Tab navigation ─────────────────────────────────────────────────────────

  test('shows Mocks and Specs page tabs', async ({ page }) => {
    const tabs = page.locator('.page-nav button[mat-tab-link]');
    await expect(tabs.nth(0)).toContainText('Mocks');
    await expect(tabs.nth(1)).toContainText('Specs');
  });

  test('starts on the Mocks tab', async ({ page }) => {
    const mocksTab = page.locator('.page-nav button[mat-tab-link]:has-text("Mocks")');
    await expect(mocksTab).toHaveClass(/mdc-tab--active|mat-tab-link-active/);
    await expect(page.locator('app-mock-table')).toBeVisible();
    await expect(page.locator('app-specs-tab')).not.toBeVisible();
  });

  test('switches to Specs tab', async ({ page }) => {
    await openSpecsTab(page);
    await expect(page.locator('app-specs-tab')).toBeVisible();
    await expect(page.locator('app-mock-table')).not.toBeVisible();
  });

  test('switches back to Mocks tab from Specs', async ({ page }) => {
    await openSpecsTab(page);
    await page.click('.page-nav button[mat-tab-link]:has-text("Mocks")');
    await expect(page.locator('app-mock-table')).toBeVisible();
    await expect(page.locator('app-specs-tab')).not.toBeVisible();
  });

  // ── Mocks tab empty state ──────────────────────────────────────────────────

  test('Mocks tab shows empty state message', async ({ page }) => {
    await expect(page.locator('app-mock-table .empty-state')).toBeVisible();
    await expect(page.locator('app-mock-table .empty-state')).toContainText(
      'No mocks registered yet',
    );
  });

  test('Mocks tab empty state mentions provideMockResourceBus', async ({ page }) => {
    await expect(page.locator('app-mock-table .empty-state')).toContainText(
      'provideMockResourceBus',
    );
  });

  test('filter input accepts text', async ({ page }) => {
    const input = page.locator('.mocks-filter input[placeholder="Filter…"]');
    await input.fill('PETS');
    await expect(input).toHaveValue('PETS');
  });

  // ── Specs tab — empty state ────────────────────────────────────────────────

  test('Specs tab header shows "Registered Specs"', async ({ page }) => {
    await openSpecsTab(page);
    await expect(page.locator('.specs-title')).toContainText('Registered Specs');
  });

  test('Specs tab shows empty state with instructions', async ({ page }) => {
    await openSpecsTab(page);
    await expect(page.locator('.empty-state')).toBeVisible();
    await expect(page.locator('.empty-state')).toContainText('No specs registered');
    await expect(page.locator('.empty-state code').first()).toContainText('mocks.manifest.json');
  });

  test('Specs tab shows + File and + URL buttons', async ({ page }) => {
    await openSpecsTab(page);
    await expect(page.locator('button:has-text("+ File")')).toBeVisible();
    await expect(page.locator('button:has-text("+ URL")')).toBeVisible();
  });

  // ── Specs tab — URL mode ───────────────────────────────────────────────────

  test('+ URL button shows URL input row', async ({ page }) => {
    await openSpecsTab(page);
    await expect(page.locator('.url-row')).not.toBeVisible();
    await page.click('button:has-text("+ URL")');
    await expect(page.locator('.url-row')).toBeVisible();
    await expect(page.locator('.url-row .url-input')).toBeVisible();
    await expect(page.locator('.url-row button:has-text("Fetch")')).toBeVisible();
  });

  test('+ URL toggles off when clicked again', async ({ page }) => {
    await openSpecsTab(page);
    await page.click('button:has-text("+ URL")');
    await expect(page.locator('.url-row')).toBeVisible();
    await page.click('button:has-text("+ URL")');
    await expect(page.locator('.url-row')).not.toBeVisible();
  });

  test('shows error on failed URL fetch', async ({ page }) => {
    await page.route('https://bad.test/fail.json', (route) => route.abort());
    await openSpecsTab(page);
    await typeAndFetch(page, 'https://bad.test/fail.json');
    await expect(page.locator('.error-row')).toBeVisible();
  });

  test('shows error on non-200 HTTP response', async ({ page }) => {
    await page.route('https://bad.test/notfound.json', (route) =>
      route.fulfill({ status: 404, body: 'Not Found' }),
    );
    await openSpecsTab(page);
    await typeAndFetch(page, 'https://bad.test/notfound.json');
    await expect(page.locator('.error-row')).toContainText('HTTP 404');
  });

  test('shows error when JSON is missing specId field', async ({ page }) => {
    await page.route('https://bad.test/bad.json', (route) =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify({ mocks: [] }) }),
    );
    await openSpecsTab(page);
    await typeAndFetch(page, 'https://bad.test/bad.json');
    await expect(page.locator('.error-row')).toBeVisible();
    await expect(page.locator('.error-row')).toContainText('specId');
  });

  // ── Specs tab — add manifest via URL ──────────────────────────────────────

  test('adds a manifest via URL and shows it in the list', async ({ page }) => {
    await addManifestViaUrl(page);
    await expect(page.locator('.spec-id')).toContainText('test-api');
  });

  test('spec row shows endpoint count after adding manifest', async ({ page }) => {
    await addManifestViaUrl(page);
    await expect(page.locator('.spec-meta')).toContainText('2 endpoints');
  });

  test('URL input clears and row hides after successful fetch', async ({ page }) => {
    await addManifestViaUrl(page);
    await expect(page.locator('.url-row')).not.toBeVisible();
  });

  test('empty state disappears after adding a spec', async ({ page }) => {
    await addManifestViaUrl(page);
    await expect(page.locator('.empty-state')).not.toBeVisible();
    await expect(page.locator('.spec-list')).toBeVisible();
  });

  test('error clears on successful fetch after a previous error', async ({ page }) => {
    await page.route('https://bad.test/fail.json', (route) => route.abort());
    await routeManifest(page);
    await openSpecsTab(page);
    await typeAndFetch(page, 'https://bad.test/fail.json');
    await expect(page.locator('.error-row')).toBeVisible();
    // URL row stays open after error — just update the input value
    await page.fill('.url-row .url-input', MANIFEST_URL);
    await page.click('.url-row button:has-text("Fetch")');
    await expect(page.locator('.error-row')).not.toBeVisible();
    await expect(page.locator('.spec-id')).toContainText('test-api');
  });

  // ── Specs tab — add manifest via file upload ───────────────────────────────

  test('adds a manifest via file upload', async ({ page }) => {
    await openSpecsTab(page);
    const chooser = page.waitForEvent('filechooser');
    await page.click('button:has-text("+ File")');
    const fc = await chooser;
    await fc.setFiles({
      name: 'mocks.manifest.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(MANIFEST)),
    });
    await expect(page.locator('.spec-id')).toContainText('test-api');
  });

  // ── Specs tab — OpenAPI spec import ───────────────────────────────────────

  test('fetching an OpenAPI spec shows import confirmation form', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    await expect(page.locator('.import-form')).toBeVisible();
    await expect(page.locator('.import-title')).toContainText('Import OpenAPI Spec');
  });

  test('import form shows endpoint and schema counts', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    await expect(page.locator('.import-preview')).toContainText('2 endpoints');
    await expect(page.locator('.import-preview')).toContainText('with schemas');
  });

  test('import form pre-fills specId from spec info.title', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    const idInput = page.locator('.import-form .url-input');
    await expect(idInput).toHaveValue('test-api');
  });

  test('import form allows editing the specId', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    const idInput = page.locator('.import-form .url-input');
    await idInput.fill('my-custom-id');
    await expect(idInput).toHaveValue('my-custom-id');
  });

  test('cancelling import hides the form and does not add a spec', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    await page.click('.import-actions button:has-text("Cancel")');
    await expect(page.locator('.import-form')).not.toBeVisible();
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('confirming import adds spec with schema count', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    await page.click('.import-actions button:has-text("Import")');
    await expect(page.locator('.spec-id')).toContainText('test-api');
    await expect(page.locator('.spec-meta')).toContainText('2 schemas');
  });

  test('confirming import with custom specId stores that id', async ({ page }) => {
    await routeOpenApiSpec(page);
    await openSpecsTab(page);
    await typeAndFetch(page, SPEC_URL);
    await page.locator('.import-form .url-input').fill('petstore');
    await page.click('.import-actions button:has-text("Import")');
    await expect(page.locator('.spec-id')).toContainText('petstore');
  });

  test('uploading an OpenAPI spec file shows import confirmation', async ({ page }) => {
    await openSpecsTab(page);
    const chooser = page.waitForEvent('filechooser');
    await page.click('button:has-text("+ File")');
    const fc = await chooser;
    await fc.setFiles({
      name: 'openapi.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(OPENAPI_SPEC)),
    });
    await expect(page.locator('.import-form')).toBeVisible();
    await expect(page.locator('.import-preview')).toContainText('2 endpoints');
  });

  // ── Specs tab — remove ────────────────────────────────────────────────────

  test('remove button deletes a spec', async ({ page }) => {
    await addManifestViaUrl(page);
    await expect(page.locator('.spec-id')).toContainText('test-api');
    await page.click('.spec-row button:has-text("Remove")');
    await expect(page.locator('.spec-list')).not.toBeVisible();
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  // ── Specs tab — persistence across tab switches ────────────────────────────

  test('spec persists when switching to Mocks tab and back', async ({ page }) => {
    await addManifestViaUrl(page);
    await page.click('.page-nav button[mat-tab-link]:has-text("Mocks")');
    await expect(page.locator('app-mock-table')).toBeVisible();
    await openSpecsTab(page);
    await expect(page.locator('.spec-id')).toContainText('test-api');
  });

  test('multiple specs can be registered', async ({ page }) => {
    const manifest2 = { specId: 'other-api', mocks: [MANIFEST.mocks[0]] };
    await page.route(MANIFEST_URL, (route) =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify(MANIFEST) }),
    );
    await page.route('https://fixtures.test/other.json', (route) =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify(manifest2) }),
    );
    await openSpecsTab(page);
    await typeAndFetch(page, MANIFEST_URL);
    await expect(page.locator('.spec-id')).toHaveCount(1);
    await page.click('button:has-text("+ URL")');
    await page.fill('.url-row .url-input', 'https://fixtures.test/other.json');
    await page.click('.url-row button:has-text("Fetch")');
    await expect(page.locator('.spec-id')).toHaveCount(2);
  });
});
