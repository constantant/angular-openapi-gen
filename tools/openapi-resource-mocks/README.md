# @constantant/openapi-resource-mocks

Mock bus for [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen) tokens.

Provides zero-HTTP, pure-DI mocks for Angular `InjectionToken`-based data-access libs — with a cross-boundary API so **Playwright E2E tests** and a future **Chrome Extension devtools panel** can observe and control every token's state from outside the Angular context.

---

## Install

```bash
npm install -D @constantant/openapi-resource-mocks
```

Peer dependencies: `@angular/core >=22`, `@angular/common >=22`.

---

## Core concept

Each mock token is registered in a `MockResourceBus`. The bus:

- Exposes `window.__openApiMocks__` — a plain object keyed by token name, accessible from Playwright's `page.evaluate()` or a Chrome Extension content script.
- Emits DOM events (`openapi-mock-event`) on every state change so the extension can observe in real time.
- Listens for DOM events (`openapi-mock-control`) so the extension can push data into the app.

---

## Setup

Add `provideMockResourceBus()` once, then one `provideMockResource()` per token:

```typescript
// app.config.mock.ts (used in tests / E2E variant)
import { provideMockResourceBus, provideMockResource } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from '@myapp/petstore-data-access';

export const mockProviders = [
  provideMockResourceBus(),
  provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS'),
];
```

---

## Unit tests / Storybook (in-process control)

```typescript
import { TestBed } from '@angular/core/testing';
import { injectMockResource, provideMockResourceBus, provideMockResource } from '@constantant/openapi-resource-mocks';
import type { FindPetsByStatusResponse } from '@myapp/petstore-data-access';

TestBed.configureTestingModule({
  providers: [
    provideMockResourceBus(),
    provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS'),
  ],
});

const mock = TestBed.runInInjectionContext(() =>
  injectMockResource<FindPetsByStatusResponse>('FIND_PETS_BY_STATUS'),
);

// Preset states
mock.resolve([{ id: 1, name: 'Rex', status: 'available' }]);
mock.setLoading();
mock.fail(new Error('network'));
mock.reset();

// Delayed response (loading → data after 500 ms)
mock.resolveAfter(500, []);
```

Types come from the generated lib — no hand-written interfaces needed.

---

## E2E tests (Playwright)

```typescript
// Playwright test
await page.evaluate(() =>
  window.__openApiMocks__['FIND_PETS_BY_STATUS'].resolve([
    { id: 1, name: 'Rex', status: 'available' },
  ]),
);
await expect(page.locator('mat-row')).toHaveCount(1);

// Test loading skeleton
await page.evaluate(() => window.__openApiMocks__['FIND_PETS_BY_STATUS'].setLoading());
await expect(page.locator('mat-progress-bar')).toBeVisible();

// Simulate slow network
await page.evaluate(() =>
  window.__openApiMocks__['FIND_PETS_BY_STATUS'].resolveAfter(1000, []),
);

// Inspect current state
const state = await page.evaluate(() =>
  window.__openApiMocks__['FIND_PETS_BY_STATUS'].getState(),
);

// Full event history (requests + responses)
const history = await page.evaluate(() =>
  window.__openApiMocks__['FIND_PETS_BY_STATUS'].getHistory(),
);
```

---

## Chrome Extension integration

**Extension content script → app (control):**

```javascript
document.dispatchEvent(new CustomEvent('openapi-mock-control', {
  detail: { key: 'FIND_PETS_BY_STATUS', action: 'resolve', value: [...] },
}));
// actions: resolve | resolveAfter | setLoading | fail | reset
// resolveAfter also takes: delayMs: number
```

**App → extension (observe):**

```javascript
document.addEventListener('openapi-mock-event', (e) => {
  const { key, event } = e.detail;
  // event: { type, value?, error?, args?, ts }
  devtoolsPanel.update(key, event);
});
```

---

## API reference

### `provideMockResourceBus()`

Returns `EnvironmentProviders`. Call once in your root providers or TestBed setup.

### `provideMockResource(token, key, initialState?)`

Returns `FactoryProvider`. Registers `token` in the bus under `key`.

`initialState` can be `{ value: T }`, `{ loading: true }`, or `{ error: unknown }`.

### `injectMockResource<T>(key)`

Must be called inside an injection context (e.g. `TestBed.runInInjectionContext`). Returns `MockResourceRef<T>`.

### `createMockResourceRef<T>(initialState?)`

Creates a standalone ref without the bus — useful when you want to pass the ref to `provideMockResource` yourself for more fine-grained test setup.

### `MockResourceRef<T>`

| Member | Description |
|--------|-------------|
| `value: Signal<T \| undefined>` | Current response data |
| `status: Signal<ResourceStatus>` | Angular `ResourceStatus` enum value |
| `error: Signal<unknown>` | Current error, if any |
| `isLoading: Signal<boolean>` | `true` while Loading or Refreshing |
| `hasValue(): boolean` | `true` when value is set |
| `resolve(value: T)` | Set value, clear error → Resolved |
| `resolveAfter(ms, value)` | Loading immediately, resolve after delay |
| `setLoading()` | Clear error → Loading |
| `fail(error)` | Set error → Error |
| `reset()` | Clear all → Idle |
| `set(value)` | Local mutation → Local (ResourceRef interface) |
| `update(fn)` | Local update → Local (ResourceRef interface) |
| `onRequest(cb)` | Subscribe to factory invocations; returns unsubscribe fn |
| `reload()` | No-op, returns `false` |

### `window.__openApiMocks__[key]`

| Member | Description |
|--------|-------------|
| `resolve(value)` | Set value (serializable) |
| `resolveAfter(ms, value)` | Delayed resolve |
| `setLoading()` | Start loading state |
| `fail(error)` | Set error state |
| `reset()` | Return to Idle |
| `getState()` | `{ status, value, error }` snapshot |
| `getHistory()` | Array of all `MockEvent` entries |
| `onEvent(cb)` | Subscribe to events; returns unsubscribe fn |

### `MockEvent` types

```typescript
type MockEvent =
  | { type: 'request'; args: unknown[]; ts: number }  // factory called by component
  | { type: 'resolve'; value: unknown; ts: number }
  | { type: 'loading'; ts: number }
  | { type: 'error'; error: unknown; ts: number }
  | { type: 'reset'; ts: number };
```

---

## License

MIT
