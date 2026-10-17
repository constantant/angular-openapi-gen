# 4 — E2E tests with Playwright

For end-to-end tests you add mock providers on top of your real app config and run the app on a
separate port. Playwright's `page.evaluate()` then calls `openApiMock(key)` to control every mocked
endpoint from the test process — no Angular internals exposed, no test IDs to keep in sync.

---

## How it works

```
Playwright test process
  page.evaluate(() => openApiMock('KEY').resolve([...]))
        │
        │  window.openApiMock / window.__openApiMocks__
        ▼
Angular app (port 4201) — real tokens, real HttpClient
        │
        │  fetch / XMLHttpRequest, patched by the mock runtime
        ▼
  request of a mocked endpoint → answered in the page
  any other request            → the real API
```

The app is not rewired: each `provideXxxMock()` only registers a filter for that endpoint's
requests. Editing a mock answers the requests it is holding, or reloads the live `httpResource`s of
that endpoint so the page shows the new answer.

---

## Step 1 — install

```bash
npm install -D @constantant/openapi-resource-mocks
```

---

## Step 2 — mock app config

Keep `app.config.ts` as it is and merge the mocks into it:

```typescript
// app.config.mock.ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig as baseConfig } from './app.config';
import {
  provideFindPetsByStatusMock,
  provideAddPetMock,
} from '@myapp/petstore-data-access/mock';

const mockConfig: ApplicationConfig = {
  providers: [
    provideFindPetsByStatusMock({ value: [], delay: 100 }), // answered after 100 ms
    provideAddPetMock({ loading: true }),                   // held until the test answers it
  ],
};

export const mockAppConfig = mergeApplicationConfig(baseConfig, mockConfig);
```

> `provideFindPetsByStatusMock()` is the generated wrapper from `--includeMocks`. Without it, write
> a `MockEndpoint` descriptor and use `provideMockEndpoint()` — see the
> [mocks README](../tools/openapi-resource-mocks/README.md#setup).

Rules of thumb:

- An endpoint with **no behavior** (`provideAddPetMock()`) passes through to the real API until the
  test sets one. Give every endpoint the tests rely on a behavior, so nothing depends on the network.
- `value` is the full response type. With `--validateResponses` it is validated like a real
  response.
- The base URL stays whatever your real config provides; the filter matches requests under it.

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

A `fileReplacements` entry that swaps `app.config.ts` for `app.config.mock.ts` works just as well;
in that case put the real config in a third file both of them import, so the replacement does not
import itself.

---

## Step 4 — TypeScript declarations for `page.evaluate()`

Add a global type declaration so `openApiMock()` is recognised inside `page.evaluate()`:

```typescript
// e2e/src/global.d.ts
interface MockEntry {
  resolve(value: unknown): void;
  resolveAfter(ms: number, value: unknown): void;
  setLoading(): void;
  fail(error: unknown, status?: number): void;
  reset(): void;
  reload(): boolean;
  setCatchMode(enabled: boolean): void;
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  simulateProgress(type: 'upload' | 'download', total: number, ms: number, value: unknown): void;
  getState(): { status: string; value: unknown; error: unknown; progress: unknown; requestCount: number };
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
bootstrapped and the endpoints are registered:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/pets');
  await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();
  // At this point openApiMock('FIND_PETS_BY_STATUS') is ready
});
```

Without this guard, `page.evaluate()` calls throw `openApiMock is not defined`.

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

The page already loaded its data; `resolve()` reloads the resource and it renders the new list.

### Test loading state

```typescript
test('shows progress bar while loading', async ({ page }) => {
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').setLoading());
  await expect(page.locator('mat-progress-bar')).toBeVisible();
});
```

### Test error state

A mock failure is a real failing HTTP response. The second argument is its status (default 500),
the first its body:

```typescript
test('shows error message on failure', async ({ page }) => {
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').fail({ message: 'Service unavailable' }, 503)
  );

  await expect(page.getByText('Failed to load pets')).toBeVisible();
});
```

### Back to the configured behavior

```typescript
await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').reset());
```

### HttpClient (Observable) endpoints

An `httpResource` can be reloaded from outside, an Observable cannot. For endpoints generated with
`--clientType=httpClient`, an edit applies to the **next** request: set the mock first, then trigger
the request in the page (click the button, change the filter).

---

## Asserting request params

`getHistory()` records every request as a `request` entry. `args` is read from the wire: path
parameters (strings), then the body, then the query (an object of strings).

```typescript
test('sends the selected status filter', async ({ page }) => {
  await page.getByLabel('Sold').click();

  const history = await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').getHistory()
  );

  const requests = history.filter((e) => e.type === 'request');
  expect(requests.at(-1)?.args?.[0]).toEqual({ status: 'sold' });
});
```

A resource whose request is suppressed (its params thunk returned `undefined`) sends nothing, so
it leaves no `request` entry.

### Reset history between scenarios

```typescript
await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').clearHistory());
```

---

## File upload progress

Progress needs the XHR transport (`provideHttpClient(withXhr())` on Angular 22+) and a request that
is being held:

```typescript
test('shows upload progress bar', async ({ page }) => {
  await page.evaluate(() => openApiMock('UPLOAD_FILE').setLoading());
  await page.getByRole('button', { name: 'Upload' }).click();

  await page.evaluate(() => openApiMock('UPLOAD_FILE').setProgress('upload', 1_000_000, 4_000_000));
  await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '25');

  await page.evaluate(() => openApiMock('UPLOAD_FILE').resolve({ code: 200, message: 'stored' }));
});
```

`simulateProgress('upload', totalBytes, durationMs, finalValue)` animates the same thing in 10
steps and then responds.

---

## Mocking the production build instead

A mock build is the simplest setup for CI. The runtime itself does not need one:
`@constantant/openapi-resource-mocks/runtime` is a framework-free entry (`installMockInterception()`
and `MockRuntime.register()`), which a tool can load into a page that bundles no mock code. The
[DevTools extension](./05-devtools.md#mocking-a-production-build) does exactly that, interactively.
`@constantant/openapi-resource-mocks/playwright` does that for Playwright: `installOpenApiMocks(page,
{ baseUrl, endpoints: ENDPOINTS, strict: true })` loads the runtime into every page, keeps the
behaviors you set across reloads and records every request in Node, so the tests can run against
the build you deploy. See [Mocking the production build](../tools/openapi-resource-mocks/README.md#mocking-the-production-build-playwright).

---

## Next

[Guide 5 — Chrome DevTools Extension →](./05-devtools.md)
