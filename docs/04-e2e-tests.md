# 4 — E2E tests with Playwright

For end-to-end tests you swap the real HTTP providers for `provideMockResourceBus()` and
run the app on a separate port. Playwright's `page.evaluate()` can then call
`openApiMock(key)` to control every mock from the test process — no Angular internals
exposed, no test IDs to keep in sync.

---

## How it works

```
Playwright test process
  page.evaluate(() => openApiMock('KEY').resolve([...]))
        │
        │  window.openApiMock / window.__openApiMocks__
        ▼
Angular app (port 4201)
  MockResourceBus ← registered by provideMockResourceBus()
        │
        │  sets signal state on the matching MockResourceRef
        ▼
  Component re-renders with new value
```

The bus exposes every registered mock on `window.__openApiMocks__` as a plain object.
`openApiMock('KEY')` is a shorthand added by the bus — equivalent to `window.__openApiMocks__['KEY']`.

---

## Step 1 — install

```bash
npm install -D @constantant/openapi-resource-mocks
```

---

## Step 2 — mock app config

Create a separate app config that replaces the real HTTP providers with mocks.
Place this next to your real `app.config.ts`:

```typescript
// app.config.mock.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMockResourceBus } from '@constantant/openapi-resource-mocks';
import {
  PETSTORE_BASE_URL,
  provideFindPetsByStatusMock,
  provideAddPetMock,
} from '@myapp/petstore-data-access/mock';
import { appRoutes } from './app.routes';

export const mockAppConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    { provide: PETSTORE_BASE_URL, useValue: 'http://localhost:4201' },
    provideMockResourceBus(),
    provideFindPetsByStatusMock({ value: [], delay: 100 }), // start resolved
    provideAddPetMock({ loading: true }),                   // start loading
  ],
};
```

> `provideFindPetsByStatusMock()` is the generated mock wrapper from `--includeMocks`.
> Without `--includeMocks`, use `provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS', ...)`
> imported from `@constantant/openapi-resource-mocks`.

Create a mock entry point that uses the mock config:

```typescript
// src/main.mock.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { mockAppConfig } from './app/app.config.mock';

bootstrapApplication(AppComponent, mockAppConfig);
```

---

## Step 3 — separate build / serve target

Add a `mock-e2e` configuration to your app's `project.json` that points at `main.mock.ts`
and serves on a different port (e.g. 4201):

```json
{
  "targets": {
    "serve": {
      "configurations": {
        "mock-e2e": {
          "buildTarget": "myapp:build:mock-e2e",
          "port": 4201
        }
      }
    },
    "build": {
      "configurations": {
        "mock-e2e": {
          "browser": "src/main.mock.ts"
        }
      }
    }
  }
}
```

---

## Step 4 — TypeScript declarations for `page.evaluate()`

Add a global type declaration so `openApiMock()` is recognised inside `page.evaluate()`:

```typescript
// e2e/src/global.d.ts
interface MockEntry {
  resolve(value: unknown): void;
  resolveAfter(ms: number, value: unknown): void;
  setLoading(): void;
  fail(error: unknown): void;
  reset(): void;
  reload(): boolean;
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  simulateProgress(type: 'upload' | 'download', total: number, ms: number, value: unknown): void;
  getState(): { status: string; value: unknown; error: unknown; requestCount: number };
  getHistory(): Array<{ type: string; ts: number; args?: unknown[]; value?: unknown }>;
  clearHistory(): void;
}

interface Window {
  __openApiMocks__: Record<string, MockEntry>;
  openApiMock: (key: string) => MockEntry;
}

declare function openApiMock(key: string): MockEntry;
```

---

## Step 5 — Playwright config for the mock suite

Create a separate Playwright config so mock specs never run against the real app:

```typescript
// playwright.mock.config.ts
import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e/src/mock' }),
  use: {
    baseURL: 'http://localhost:4201',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx run myapp:serve --configuration=mock-e2e',
    url: 'http://localhost:4201',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

And exclude mock specs from the main config:

```typescript
// playwright.config.ts
export default defineConfig({
  testIgnore: ['**/mock/**'],
  // ...
});
```

---

## Step 6 — write Playwright specs

### Guard: wait for the page to be ready

Always wait for a page landmark before running assertions — this guarantees Angular has
bootstrapped and the mock factories have been called:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/pets');
  await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();
  // At this point openApiMock('FIND_PETS_BY_STATUS') is ready
});
```

Without this guard, `page.evaluate()` calls throw `openApiMock is not defined` because
the mock bus hasn't bootstrapped yet.

### Resolve with data

```typescript
test('renders pet list', async ({ page }) => {
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').resolve([
      { id: 1, name: 'Rex', status: 'available', photoUrls: [] },
      { id: 2, name: 'Luna', status: 'available', photoUrls: [] },
    ])
  );

  await expect(page.locator('.pet-row')).toHaveCount(2);
  await expect(page.getByText('Rex')).toBeVisible();
});
```

### Test loading state

```typescript
test('shows progress bar while loading', async ({ page }) => {
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').setLoading());
  await expect(page.locator('mat-progress-bar')).toBeVisible();
});
```

### Test error state

```typescript
test('shows error message on failure', async ({ page }) => {
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').fail({ message: 'Service unavailable' })
  );

  await expect(page.getByText('Failed to load pets')).toBeVisible();
});
```

### Test reload

`reload()` keeps the current value visible while the resource transitions to `'reloading'`.
Use it to test pull-to-refresh or "Load more" flows:

```typescript
test('refresh button shows reloading state', async ({ page }) => {
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').resolve([{ id: 1, name: 'Rex', ... }])
  );
  await expect(page.locator('.pet-row')).toHaveCount(1);

  // Trigger reload — value stays visible, spinner appears
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').reload());
  await expect(page.locator('.pet-row')).toHaveCount(1); // still visible
  await expect(page.locator('mat-progress-bar')).toBeVisible(); // loading indicator

  // Resolve with new data
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').resolve([
      { id: 1, name: 'Rex', ... },
      { id: 2, name: 'Luna', ... },
    ])
  );
  await expect(page.locator('.pet-row')).toHaveCount(2);
});
```

---

## Asserting request params

`getHistory()` records every factory call as a `request` entry. The args are the resolved
values at call time — never raw functions:

```typescript
test('sends the selected status filter', async ({ page }) => {
  // Wait for the initial request
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').resolve([]));

  // Click the "Sold" filter chip
  await page.getByLabel('Sold').click();
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').resolve([]));

  const history = await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').getHistory()
  );

  const requests = history.filter((e) => e.type === 'request');
  expect(requests).toHaveLength(2);
  expect(requests[1].args[0]).toEqual({ status: 'sold' });
});
```

### Reset history between scenarios

```typescript
afterEach(async ({ page }) => {
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').clearHistory());
});
```

---

## File upload progress

```typescript
test('shows upload progress bar', async ({ page }) => {
  // Animate 4 MB upload over 2 s in 10 steps, then resolve
  await page.evaluate(() =>
    openApiMock('UPLOAD_FILE').simulateProgress('upload', 4_000_000, 2000, { id: 'abc' })
  );
  await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible();
});
```

---

## Next

[Guide 5 — Chrome DevTools Extension →](./05-devtools.md)
