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
import { FIND_PETS_BY_STATUS, UPLOAD_FILE } from '@myapp/petstore-data-access';

export const mockProviders = [
  provideMockResourceBus(),
  provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS'),
  provideMockResource(UPLOAD_FILE, 'UPLOAD_FILE'),
];
```

---

## Unit tests / Storybook (in-process control)

```typescript
import { TestBed } from '@angular/core/testing';
import { injectMockResource, provideMockResourceBus, provideMockResource } from '@constantant/openapi-resource-mocks';

TestBed.configureTestingModule({
  imports: [PetsComponent],
  providers: [
    provideMockResourceBus(),
    provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS'),
  ],
});

// Render the component first — this calls the token factory and registers the ref
const fixture = TestBed.createComponent(PetsComponent);
fixture.detectChanges();

// Now the ref is in the bus
const mock = TestBed.runInInjectionContext(() =>
  injectMockResource('FIND_PETS_BY_STATUS'),
);

mock.resolve([{ id: 1, name: 'Rex', status: 'available' }]);
fixture.detectChanges();

mock.setLoading();
mock.fail(new Error('network'));
mock.reset();

// Delayed response (loading → data after 500 ms)
mock.resolveAfter(500, []);
```

Types come from the generated lib — no hand-written interfaces needed.

---

## File upload / download progress

### In-process (unit tests / Storybook)

```typescript
const mock = TestBed.runInInjectionContext(() =>
  injectMockResource<UploadResponse>('UPLOAD_FILE'),
);

// Animate through 10 steps over 2 s, then resolve
mock.simulateProgress('upload', 4_000_000, 2000, { id: 'abc123' });

// Or drive progress manually for precise test control
mock.setProgress('upload', 1_000_000, 4_000_000); // 25 %
mock.setProgress('upload', 4_000_000, 4_000_000); // 100 %
mock.resolve({ id: 'abc123' });

// Download progress (total unknown — streaming)
mock.setProgress('download', 16_384);

// Simulate failure mid-upload — progress is preserved so the UI can show "failed at 25%"
mock.setProgress('upload', 1_000_000, 4_000_000);
mock.fail(new Error('connection reset'));
console.log(mock.progress()); // { type: 'upload', loaded: 1_000_000, total: 4_000_000 }
```

### E2E (Playwright)

```typescript
// Animate upload progress then resolve
await page.evaluate(() =>
  window.__openApiMocks__['UPLOAD_FILE'].simulateProgress('upload', 4_000_000, 2000, { id: 'abc123' }),
);
await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible();

// Manual steps
await page.evaluate(() =>
  window.__openApiMocks__['UPLOAD_FILE'].setProgress('upload', 1_000_000, 4_000_000),
);
await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '25');

// Fail mid-upload
await page.evaluate(() => window.__openApiMocks__['UPLOAD_FILE'].fail(new Error('timeout')));
const state = await page.evaluate(() => window.__openApiMocks__['UPLOAD_FILE'].getState());
console.log(state.progress); // { type: 'upload', loaded: 1_000_000, total: 4_000_000 }
```

### Chrome Extension → app

```javascript
// Animate upload
document.dispatchEvent(new CustomEvent('openapi-mock-control', {
  detail: {
    key: 'UPLOAD_FILE',
    action: 'simulateProgress',
    progressType: 'upload',
    total: 4_000_000,
    delayMs: 2000,
    value: { id: 'abc123' },
    steps: 20,        // optional, default 10
  },
}));

// Single progress step
document.dispatchEvent(new CustomEvent('openapi-mock-control', {
  detail: { key: 'UPLOAD_FILE', action: 'setProgress', progressType: 'download', loaded: 512, total: 1024 },
}));
```

---

## E2E tests (Playwright)

```typescript
// Resolve with data
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

// Inspect current state (includes progress if active)
const state = await page.evaluate(() =>
  window.__openApiMocks__['FIND_PETS_BY_STATUS'].getState(),
);

// Full event history (requests + responses + progress ticks)
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
//          setProgress | simulateProgress
// resolveAfter:     delayMs: number
// setProgress:      progressType: 'upload'|'download', loaded: number, total?: number
// simulateProgress: progressType, total: number, delayMs: number, value, steps?: number
```

**App → extension (observe):**

```javascript
document.addEventListener('openapi-mock-event', (e) => {
  const { key, event } = e.detail;
  // event.type: 'request' | 'resolve' | 'loading' | 'error' | 'reset' | 'progress'
  devtoolsPanel.update(key, event);
});
```

---

## API reference

### `provideMockResourceBus()`

Returns `EnvironmentProviders`. Call once in your root providers or TestBed setup.

### `provideMockResource(token, key, initialBehavior?)`

Returns `FactoryProvider`. Each time a component invokes the factory function, a fresh ref is created, registered in the bus under `key`, and `initialBehavior` is applied — simulating the full request lifecycle on every mount.

`initialBehavior` controls how the mock behaves on each invocation:

| Shape | Effect |
|-------|--------|
| `{ value: T }` | Resolves immediately with value |
| `{ value: T, delay: ms }` | Loading for `ms` ms, then resolves |
| `{ loading: true }` | Stays loading indefinitely |
| `{ error: unknown }` | Fails immediately |
| `{ error: unknown, delay: ms }` | Loading for `ms` ms, then fails |

### `injectMockResource<T>(key)`

Must be called inside an injection context (e.g. `TestBed.runInInjectionContext`) and after the component has rendered — the ref is registered when the component first invokes the factory function, not at DI setup time. Returns `MockResourceRef<T>`.

### `TokenValue<Token>`

Utility type that extracts the response type `T` from a generated `InjectionToken<(...args) => ResourceRef<T>>`. Use it to type seed data without importing the response type by name:

```typescript
import type { TokenValue } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from '@myapp/petstore-data-access';

// type is FindPetsByStatusResponse — inferred from the token
const mockPets: TokenValue<typeof FIND_PETS_BY_STATUS> = [
  { id: 1, name: 'Rex', status: 'available', photoUrls: [] },
];
```

### `createMockResourceRef<T>(initialState?)`

Creates a standalone ref without the bus — useful for Storybook decorators, custom test harnesses, or any scenario where you need a `MockResourceRef` outside of Angular DI.

### `MockResourceRef<T>`

| Member | Description |
|--------|-------------|
| `value: Signal<T \| undefined>` | Current response data |
| `status: Signal<ResourceStatus>` | `'idle' \| 'loading' \| 'reloading' \| 'resolved' \| 'error' \| 'local'` |
| `error: Signal<unknown>` | Current error, if any |
| `isLoading: Signal<boolean>` | `true` while status is `'loading'` or `'reloading'` |
| `progress: Signal<MockProgress \| undefined>` | Current transfer progress, if active |
| `hasValue(): boolean` | `true` when value is set |
| `resolve(value: T)` | Set value, clear error and progress → `'resolved'` |
| `resolveAfter(ms, value)` | Set loading immediately, resolve after delay |
| `setLoading()` | Clear error → `'loading'` |
| `fail(error)` | Set error → `'error'` (progress preserved) |
| `reset()` | Clear all including progress → `'idle'` |
| `setProgress(type, loaded, total?)` | Set progress and status → `'loading'` |
| `simulateProgress(type, totalBytes, durationMs, finalValue, steps?)` | Animate incremental progress over `durationMs` ms then resolve |
| `set(value)` | Local mutation → `'local'` (ResourceRef interface) |
| `update(fn)` | Local update → `'local'` (ResourceRef interface) |
| `onRequest(cb)` | Subscribe to factory invocations; returns unsubscribe fn |
| `reload()` | No-op, returns `false` |

### `MockProgress`

```typescript
interface MockProgress {
  type: 'upload' | 'download';
  loaded: number;   // bytes transferred
  total?: number;   // total bytes (undefined for streaming / unknown-length responses)
}
```

### `window.__openApiMocks__[key]`

| Member | Description |
|--------|-------------|
| `resolve(value)` | Set value (JSON-serializable) |
| `resolveAfter(ms, value)` | Delayed resolve |
| `setLoading()` | Start loading state |
| `fail(error)` | Set error state |
| `reset()` | Return to idle |
| `setProgress(type, loaded, total?)` | Set transfer progress |
| `simulateProgress(type, totalBytes, durationMs, finalValue, steps?)` | Animate progress then resolve |
| `getState()` | `{ status, value, error, progress }` snapshot |
| `getHistory()` | Array of all `MockEvent` entries (requests, responses, progress ticks) |
| `onEvent(cb)` | Subscribe to all events; returns unsubscribe fn |

### `MockEvent` types

```typescript
type MockEvent =
  | { type: 'request';  args: unknown[]; ts: number }   // factory called by component
  | { type: 'resolve';  value: unknown; ts: number }
  | { type: 'loading';  ts: number }
  | { type: 'error';    error: unknown; ts: number }
  | { type: 'reset';    ts: number }
  | { type: 'progress'; progressType: 'upload' | 'download'; loaded: number; total?: number; ts: number };
```

---

## License

MIT
