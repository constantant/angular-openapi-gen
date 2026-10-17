# @constantant/openapi-resource-mocks

[![npm](https://img.shields.io/npm/v/@constantant/openapi-resource-mocks)](https://www.npmjs.com/package/@constantant/openapi-resource-mocks)

In-browser mocks for [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen) endpoints.

The package patches `fetch` and `XMLHttpRequest` in the page and answers the requests of the
endpoints you mock. Nothing is replaced in your app: it runs its real tokens, the real
`HttpClient` / `httpResource`, its interceptors and its response validation. There is no service
worker and no network layer, and every endpoint you did not mock still reaches the real API.

Because the app itself is untouched, the same mechanism can mock a **production build**: the
[DevTools extension](../openapi-resource-devtools/README.md) injects this runtime into a page that
bundles no mock code at all.

> **Upgrading from 1.x?** The token-replacement API (`provideMockResourceBus`,
> `provideMockResource`, `provideMockObservable`, `provideMockHttpEvents`, `injectMockResource`,
> `mockResource`, …) is gone. See [Migrating from 1.x](#migrating-from-1x).

---

## Install

```bash
npm install -D @constantant/openapi-resource-mocks
```

Peer dependencies: `@angular/core >=20`, `@angular/common >=20`, `rxjs ^7.8` — verified in CI against Angular 20.0.0 through 22.x (see the [compatibility table](../../README.md#compatibility)).

---

## How it works

- `provideXxxMock(behavior?)` registers a **filter** for one endpoint: HTTP method + the API's base
  URL + the OpenAPI path template (`/pet/{petId}`).
- A request that matches is answered in the page and never reaches the network. When several
  templates match, the more specific one wins (`/pet/findByStatus` beats `/pet/{petId}`).
- Everything else **passes through** to the real API — including a registered endpoint that has
  neither a behavior nor [catch mode](#catch-mode).
- The answer is a real HTTP response. Interceptors see its status and headers, an `error` arrives
  as an `HttpErrorResponse`, and a `value` goes through `--validateResponses` like a server
  response would.
- Each mocked endpoint is published as `window.__openApiMocks__[key]` (shorthand:
  `openApiMock(key)`) for Playwright, and mirrored over DOM events for the DevTools extension.

---

## Setup

Generate the lib with `--includeMocks`. Each endpoint gets a typed `provide{Operation}Mock()` and
a descriptor `{OPERATION}_MOCK`, exported from the lib's `/mock` subpath so they stay out of the
production bundle.

Keep your real config as it is and add the mocks on top of it:

```typescript
// app.config.mock.ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig as baseConfig } from './app.config';
import { provideFindPetsByStatusMock, provideAddPetMock } from '@myapp/petstore-data-access/mock';

const mockConfig: ApplicationConfig = {
  providers: [
    provideFindPetsByStatusMock({
      value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }],
      delay: 500,
    }),
    provideAddPetMock(), // registered, no behavior: real API until you set one or enable catch mode
  ],
};

export const mockAppConfig = mergeApplicationConfig(baseConfig, mockConfig);
```

`provideXxxMock()` returns `EnvironmentProviders`: use it in `ApplicationConfig.providers` or in a
route's `providers`, not in a component's `providers`. The endpoint's real token must still be
provided as usual (`provideFindPetsByStatus()`, or `providedIn: 'root'`), and so must
`provideHttpClient()` and the base URL token.

**Without `--includeMocks`**, write the descriptor yourself:

```typescript
import { provideMockEndpoint, type MockEndpoint } from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL, type FindPetsByStatusResponse } from '@myapp/petstore-data-access';

const FIND_PETS_BY_STATUS_MOCK: MockEndpoint<FindPetsByStatusResponse> = {
  key: 'FIND_PETS_BY_STATUS',
  baseUrl: PETSTORE_BASE_URL,
  meta: { specId: 'petstore', operationId: 'findPetsByStatus', path: '/pet/findByStatus', method: 'get' },
};

provideMockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [] });
```

### Behaviors

| Shape | Effect |
|-------|--------|
| `{ value }` | Responds with `value` (status 200, or 204 when `value` is `undefined`) |
| `{ value, delay: ms }` | Responds after `ms` ms |
| `{ loading: true }` | Holds every request open until you `resolve` / `fail` it |
| `{ error }` | Responds with a failing status (500) and `error` as the body |
| `{ error, delay: ms }` | Fails after `ms` ms |
| _(no behavior)_ | Passes through to the real API |

`value` and `error` behaviors also take `status` and `headers`; every behavior takes
`progress: MockProgress[]` (see [progress](#upload--download-progress)).

- **`value` is the full response type.** There is no `DeepPartial`: with `--validateResponses` a
  mocked response is validated like a real one, so a fixture has to satisfy the schema.
- A `value` is sent as JSON. A string is JSON-encoded too, unless the endpoint's
  `meta.responseType` is `'text'`. `Blob` and `ArrayBuffer` values are sent as they are.

---

## Changing a mock at runtime

Every mocked endpoint has the same controls, whether you reach them through
`openApiMock(key)` in the page, a `/testing` handle, or the DevTools panel:

```typescript
openApiMock('FIND_PETS_BY_STATUS').resolve([{ id: 2, name: 'Luna', status: 'available', photoUrls: [] }]);
openApiMock('FIND_PETS_BY_STATUS').fail({ message: 'unavailable' }, 503);
openApiMock('FIND_PETS_BY_STATUS').setLoading();
openApiMock('FIND_PETS_BY_STATUS').reset(); // back to the behavior given to provideXxxMock()
```

An edit replaces the endpoint's behavior for all later requests, and it reaches what is already on
screen:

- Requests that are **held open** (`{ loading: true }`, a delay, catch mode) are answered.
- When nothing is held, the live `httpResource`s of that endpoint are **reloaded**, so they fetch
  the new answer. Generated tokens hand their resources to the runtime through a small
  `mock-hook.ts` (emitted with `--includeMocks`, or on its own with `--mockHooks`).
- `HttpClient` (Observable) tokens cannot be re-run from outside: an edit applies to their **next**
  request.

`reset()` on an endpoint without an initial behavior releases its held requests to the real API.

### Real responses

When a request of a registered endpoint reaches the real API (it has no behavior, or was released
to it), a JSON response is kept as the endpoint's state — `getState().value`, status `resolved` —
and reported as a `real` event. Tools use it as the starting point for a mock; it never changes
what the app receives, and it does not replace a value you set with `resolve()`. Bodies over
512 KB are skipped.

### Catch mode

Catch mode holds every request of an endpoint until you decide its response — useful to inspect
what the app sent first:

```typescript
openApiMock('ADD_PET').setCatchMode(true);
// ... the app sends the request; it is recorded as a `caught` event and stays pending ...
openApiMock('ADD_PET').resolve({ id: 99, name: 'New Pet', status: 'available', photoUrls: [] });
```

---

## Unit tests (`/testing`)

`@constantant/openapi-resource-mocks/testing` mocks an endpoint for a component test. The component
uses the real token and the real `HttpClient`; only the transport is replaced.

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockEndpoint, uninstallMockInterception } from '@constantant/openapi-resource-mocks/testing';
import { FIND_PETS_BY_STATUS_MOCK } from '@myapp/petstore-data-access/mock';

afterAll(() => uninstallMockInterception());

it('renders the pets', async () => {
  const pets = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
    value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }],
  });
  TestBed.configureTestingModule({
    imports: [PetsComponent],
    providers: [provideHttpClient(), pets],
  });

  const fixture = TestBed.createComponent(PetsComponent);
  await fixture.whenStable(); // responses are asynchronous, as in production
  fixture.detectChanges();

  pets.expectCalledWith({ status: 'available' });

  pets.resolve([{ id: 2, name: 'Luna', status: 'available', photoUrls: [] }]); // live resources reload
  await fixture.whenStable();
});
```

### `mockEndpoint<T>(endpoint, behaviorOrOptions?)`

Returns an `EnvironmentProviders` that is also a `MockEndpointHandle<T>`. It works for every client
type (`httpResource`, `HttpClient`, `HttpEvent` streams). It provides:

- the endpoint's real token (unless the lib is `providedIn: 'root'`),
- a default base URL, `MOCK_BASE_URL` (`http://mock.test`) — list your own base URL provider after
  the handle to override it,
- the filter itself.

You add `provideHttpClient()`. The second argument is a [behavior](#behaviors) or
`{ sequence: [...] }`. **Without one, every request is held**, so nothing escapes to the network.

| Member | Description |
|--------|-------------|
| `.calls` | `readonly unknown[][]` — what each request carried (see [request args](#request-args)) |
| `.expectCalled()` | Throws if the endpoint was never requested |
| `.expectCalledWith(...args)` | Throws if no request matches (deep equality) |
| `.resolve(value)` | Answer held requests and all later ones; live `httpResource`s reload |
| `.fail(error, status?)` | The same with a failing response (default 500) |
| `.setLoading()` | Hold every request until `resolve` / `fail` |
| `.setProgress(type, loaded, total?)` | Report transfer progress to the held requests |
| `.reset()` | Back to the configured behavior |

The controls work once the endpoint is registered, i.e. after the component was created.

### Waiting for a response

- `await fixture.whenStable()` — for a request that gets answered.
- `await flushMocks()` — for a request that stays held (`{ loading: true }`): it lets progress
  events, or a `resolve()` / `fail()` you just called, reach the component.

### Response sequences

Each request consumes the next entry; the last one repeats:

```typescript
const pets = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
  sequence: [
    { error: { message: 'timeout' }, status: 504 },
    { value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }] },
  ],
});
```

### Request args

`.calls` and the `request` events in the history are read from the wire, in this order:

1. path parameters, as strings, in template order (`/pet/{petId}` → `'7'`),
2. the body, when the request has one (parsed when it was JSON; a `File` / `FormData` as it is),
3. the query, when the URL has one, as an object of strings (`{ status: 'available' }`).

---

## Upload / download progress

Progress is simulated on the **XHR** transport only — as in a real browser, `fetch` cannot report
upload progress. On Angular 22+ that means `provideHttpClient(withXhr())`.

```typescript
// Unit test: assert the progress bar while the upload is held at 25 %
const upload = mockEndpoint(UPLOAD_FILE_MOCK, {
  loading: true,
  progress: [{ type: 'upload', loaded: 1_000_000, total: 4_000_000 }],
});
TestBed.configureTestingModule({
  imports: [PetsPage],
  providers: [provideHttpClient(withXhr()), upload],
});
// ... trigger the upload ...
await flushMocks();
upload.expectCalledWith('7', file);
expect(bar.getAttribute('aria-valuenow')).toBe('25');
```

```typescript
// Playwright: drive a held upload step by step
await page.evaluate(() => openApiMock('UPLOAD_FILE').setProgress('upload', 1_000_000, 4_000_000));
await expect(bar).toHaveAttribute('aria-valuenow', '25');
await page.evaluate(() => openApiMock('UPLOAD_FILE').resolve({ code: 200, message: 'stored' }));

// Or animate it: 10 steps over 2 s, then respond
await page.evaluate(() =>
  openApiMock('UPLOAD_FILE').simulateProgress('upload', 4_000_000, 2000, { code: 200, message: 'stored' }),
);
```

`setProgress` reports to requests that are currently held, so give the endpoint
`{ loading: true }` (or catch mode) first.

---

## E2E tests (Playwright)

Build the app with the mock config (a `fileReplacements` entry swapping `app.config.ts` for
`app.config.mock.ts` is enough) and control the endpoints from the test:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/pets');
  await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();
});

test('shows new data', async ({ page }) => {
  await page.evaluate(() =>
    openApiMock('FIND_PETS_BY_STATUS').resolve([{ id: 10, name: 'Shadow', status: 'pending', photoUrls: [] }]),
  );
  await expect(page.getByText('Shadow')).toBeVisible();
});

test('shows the error', async ({ page }) => {
  await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').fail({ message: 'unavailable' }, 503));
  await expect(page.getByText('Request failed (HTTP 503).')).toBeVisible();
});

test('sends the default filter', async ({ page }) => {
  const history = await page.evaluate(() => openApiMock('FIND_PETS_BY_STATUS').getHistory());
  const request = history.find((e) => e.type === 'request');
  expect(request?.args[0]).toEqual({ status: 'available' });
});
```

Ambient declarations for `page.evaluate()` bodies:

```typescript
// src/global.d.ts
import type { WindowMockEntry } from '@constantant/openapi-resource-mocks';

declare global {
  function openApiMock(key: string): WindowMockEntry;
}
```

The full walk-through (serve target, separate Playwright config) is in
[guide 4](../../docs/04-e2e-tests.md).

### Mocking the production build (`/playwright`)

A mock build is not needed: `@constantant/openapi-resource-mocks/playwright` loads the runtime into
the pages of the build you deploy, so the e2e tests run against that exact build. It runs in the
Playwright process and needs no Angular there.

```typescript
import { test, expect } from '@playwright/test';
import { installOpenApiMocks } from '@constantant/openapi-resource-mocks/playwright';
// Generated with --includeMocks: plain data and types, no Angular at runtime.
import { ENDPOINTS, type EndpointResponses, type EndpointErrors } from '@myapp/petstore-data-access/endpoints';

test('shows the pet, then the not-found page', async ({ page }) => {
  const api = await installOpenApiMocks<EndpointResponses, EndpointErrors>(page, {
    baseUrl: 'https://petstore3.swagger.io/api/v3',   // as the app requests it; relative works too
    endpoints: ENDPOINTS,
    defaults: { FIND_PETS_BY_STATUS: { value: [] } },  // answered until a test sets something else
    strict: true,                                      // nothing under baseUrl reaches the network
  });

  const getPet = api.endpoint('GET_PET_BY_ID');
  await getPet.resolve({ id: 7, name: 'Rex', photoUrls: [] });  // typed by the spec
  await page.goto('/pets/7');
  await expect(page.getByRole('heading', { name: 'Rex' })).toBeVisible();
  await getPet.expectCalledWith('7');                           // path params, body, query: from the wire

  await getPet.failWith(404, { message: 'no pet' });            // applied in the open page and later loads
  await page.reload();
  await expect(page.getByText('Pet not found')).toBeVisible();

  api.expectNoUnmatched();
});
```

How it works:

- Before any page script runs, every page gets the runtime and the helper's bootstrap (main frame
  only). The bootstrap **holds the page's requests** until Node has sent the endpoints and their
  current behaviors, so the app's very first request is already mocked (`holdMs`, default 5 s).
- A behavior set from the test applies to the pages that are open **and** to every later page load
  in the page or context: a reload or a full navigation keeps it.
- Every request is recorded **in Node**: `requests` (args, method, URL, the headers the app set)
  and `calls` (the args) cover all page loads, oldest first.
- `strict: true` fails closed under `baseUrl` (or pass URL prefixes, e.g. `['/api/']`, when the API
  shares the site's origin): a request no endpoint answers, or one whose endpoint has no behavior,
  gets a 501 and is listed in `api.unmatched`, instead of quietly reaching a real API.

| `EndpointMock` member | |
|---|---|
| `resolve(value, { status?, headers?, delay? })` | Answer with `value` (typed by `EndpointResponses`) |
| `fail(status, body, code?)` | A documented error: `fail('404', body)` with `body` typed by `EndpointErrors`; a range or `default` key needs the numeric `code` |
| `failWith(status, body?, headers?)` | Any failing status, documented or not |
| `setLoading()` / `set(behavior)` / `reset()` | Hold requests / any behavior (`delay`, `progress`, …) / back to the default, without cases |
| `when({ path?, query? })` | The answer to the matching requests only: `.resolve()`, `.fail()`, `.failWith()`, `.setLoading()`, `.set()` (see below) |
| `sequence([behavior, …])` | Answers in turn: each request takes the next, the last repeats (a 401, then the data). Also on `when()` |
| `requests` / `calls` / `clearRequests()` | What it received, across page loads |
| `expectCalled(ms?)` / `expectCalledWith(...args)` / `waitForRequest(predicate?, ms?)` | Wait (default 5 s) for a request; the error lists what was received instead |

`api.coverage()` reports, per endpoint, how many requests it received, the statuses the mocks
**served** it, and whether a test asserted what it was **sent** (`expectCalledWith`, or
`waitForRequest` with a predicate). Joined with the generated `mocks.manifest.json` (every documented
status per endpoint), it shows which inputs and outputs of the API no test exercises.

The runtime script ships prebuilt (`runtime.global.js`); in a source checkout of this repository it is
bundled with esbuild on first use. `@playwright/test` is an optional peer dependency, used for types.

#### Different answers for different requests

One endpoint, several answers: a bond that is found and one that is refused, a search that finds
nothing. `when()` matches the path parameters (as strings, in template order) and/or query values
(the request may carry more); the first case set answers, and every other request gets the
endpoint's own behavior:

```typescript
const getBond = api.endpoint('GET_BOND');
await getBond.resolve(anyBond);                                  // every other bond
await getBond.when({ path: ['XS0000000001'] }).resolve(eDreams);
await getBond.when({ path: ['US0000000002'] }).fail('403', { title: 'Subscribers only' });
await api.endpoint('SEARCH').when({ query: { q: 'nothing' } }).resolve([]);
```

A sequence answers in turn, e.g. an expired token once and then the data:

```typescript
await api.endpoint('GET_USER').sequence([{ error: undefined, status: 401 }, { value: user }]);
```

In the page it is `{ sequence: [...] }` (`MockSequence`); its count starts again with a new behavior, and on a new
page (each page has its own runtime).

Setting a case again for the same match replaces it; `reset()` drops every case. In the page this is
one serializable behavior, `{ cases: [{ when, then }], otherwise }` (`MockCases`), which
`runtime.setBehavior()` and `configure()` accept too.

### Mocking without a mock build, by hand

`@constantant/openapi-resource-mocks/runtime` is the same runtime without the Angular providers. It
has no framework dependency, so a tool can install it from outside the app — this is what the
DevTools extension injects into production builds, and what the Playwright helper loads:

```typescript
import { installMockInterception } from '@constantant/openapi-resource-mocks/runtime';

const runtime = installMockInterception(); // one shared runtime per page, safe to call repeatedly
runtime.register(
  'FIND_PETS_BY_STATUS',
  { method: 'get', baseUrl: 'https://petstore3.swagger.io/api/v3', path: '/pet/findByStatus' },
  { behavior: { value: [] } },
);
```

---

## DOM event bridge

Used by the DevTools extension; available to any tool running next to the page.

**Control (tool → page):**

```javascript
document.dispatchEvent(new CustomEvent('openapi-mock-control', {
  detail: { key: 'FIND_PETS_BY_STATUS', action: 'resolve', value: [] },
}));
// actions on a registered endpoint:
//   resolve | resolveAfter (delayMs) | setLoading | fail (status?) | reset | reload
//   setProgress (progressType, loaded, total?) | simulateProgress (progressType, total, delayMs, value, steps?)
//   setCatchMode | clearCatchMode | clearHistory
// actions that manage endpoints from outside the app:
//   register (rule, meta?, behavior?) | unregister | configure (config: MockRuntimeConfig)
```

**Observe (page → tool):**

```javascript
document.addEventListener('openapi-mock-event', (e) => {
  const { key, event } = e.detail; // event: MockEvent
});
document.addEventListener('openapi-mock-unmatched', (e) => {
  const { method, url, reason, key } = e.detail; // UnmatchedRequest: refused by strict mode
});
```

---

## API reference

### `provideMockEndpoint<T>(endpoint, initialBehavior?)`

Returns `EnvironmentProviders`. Registers the endpoint's filter on the shared runtime for the
lifetime of the injector (installing the `fetch` / `XMLHttpRequest` patch on first use) and
unregisters it when the injector is destroyed. Generated `provide{Operation}Mock()` functions call
it with their descriptor.

### `MockEndpoint<T>`

```typescript
interface MockEndpoint<T = unknown> {
  key: string;                       // listed under this key in window.__openApiMocks__ and DevTools
  baseUrl: InjectionToken<string>;   // the lib's base URL token
  meta: MockResourceMeta;
  provide?: () => Provider;          // the real token's provider; absent for providedIn: 'root'
}
```

### `MockEndpointBehavior<T>`

```typescript
type MockEndpointBehavior<T> = (
  | { value: T; delay?: number; status?: number; headers?: Record<string, string> }
  | { loading: true }
  | { error: unknown; delay?: number; status?: number; headers?: Record<string, string> }
) & { progress?: MockProgress[] };
```

### `MockResourceMeta`

Embedded in generated `.mock.ts` files. The runtime matches requests with `method` and `path`; the
DevTools panel uses `specId` and `operationId` to find the response schema.

```typescript
interface MockResourceMeta {
  specId: string;       // matches the --specId generator option
  operationId: string;
  path: string;         // path template, e.g. '/pet/{petId}'
  method: string;       // lowercase HTTP method
  tag?: string;
  responseType?: 'json' | 'text' | 'blob'; // how the response body is read; absent means JSON
}
```

### `installMockInterception()` / `uninstallMockInterception()`

`installMockInterception()` patches `fetch` and `XMLHttpRequest` once per global and returns the
shared `MockRuntime`; you rarely call it yourself, `provideMockEndpoint` does.
`uninstallMockInterception()` restores the native functions and drops the runtime — call it in test
teardown.

### `MockRuntime`

| Member | Description |
|--------|-------------|
| `register(key, rule, registration?)` | Add an endpoint; returns an unregister function. `rule` is `{ method, baseUrl, path }` |
| `unregister(key)` | Remove an endpoint |
| `controls(key)` | The endpoint's `WindowMockEntry`, `undefined` when it is not registered |
| `setBehavior(key, behavior?)` | Any behavior with every field (`status`, `headers`, `delay`, `progress`), or `MockCases` (an answer per request); `undefined` resets it |
| `setStrict(prefixes \| false)` / `unmatchedRequests()` | Strict mode: requests under these URL prefixes that no behavior answers get a 501 (`UNMATCHED_STATUS`) instead of the network, and are recorded |
| `setCatchMode(key, enabled)` / `isCatchMode(key)` | Catch mode, also for a key that is not registered yet |
| `hold(timeoutMs)` | Park all requests until `configure()` is called or the timeout passes |
| `configure(config)` | Deliver endpoints, catch modes and `strict` from outside the app, and release held requests |
| `observeRequests()` / `observedRequests()` | Start keeping, and read, the distinct requests the page makes (method + URL without query) — the DevTools panel suggests base URLs from them. Off unless called |

### `openApiMock(key)` / `window.__openApiMocks__[key]`

| Member | Description |
|--------|-------------|
| `resolve(value)` | Respond with `value` from now on |
| `resolveAfter(ms, value)` | The same, after a delay |
| `setLoading()` | Hold requests open |
| `fail(error, status?)` | Respond with a failing status (default 500) |
| `reset()` | Drop the edit; back to the initial behavior |
| `reload()` | Reload the live `httpResource`s of the endpoint; `false` when there are none |
| `setProgress(type, loaded, total?)` | Report transfer progress to held requests |
| `simulateProgress(type, totalBytes, durationMs, finalValue, steps?)` | Animate progress, then respond |
| `setCatchMode(enabled)` | Toggle catch mode |
| `getState()` | `{ status, value, error, progress, requestCount }` — `status` is `idle`, `loading`, `resolved` or `error` |
| `getMeta()` | The endpoint's `MockResourceMeta` |
| `getHistory()` / `clearHistory()` | The endpoint's `MockEvent` log |
| `onEvent(cb)` | Subscribe to events; returns an unsubscribe function |

### `MockEvent`

```typescript
type MockEvent =
  | { type: 'request';   args: unknown[]; method?: string; url?: string; headers?: Record<string, string>; ts: number }
  | { type: 'caught';    args: unknown[]; requestId: string; method?: string; url?: string; headers?: Record<string, string>; ts: number }
  | { type: 'respond';   status: number; ts: number } // a mocked response was sent, with this status
  | { type: 'resolve';   value: unknown; ts: number }
  | { type: 'real';      status: number; value: unknown; ts: number } // the real API answered an unmocked request
  | { type: 'loading';   ts: number }
  | { type: 'reloading'; ts: number }
  | { type: 'error';     error: unknown; ts: number }
  | { type: 'reset';     ts: number }
  | { type: 'progress';  progressType: 'upload' | 'download'; loaded: number; total?: number; ts: number };
```

### `MockProgress`

```typescript
interface MockProgress {
  type: 'upload' | 'download';
  loaded: number;   // bytes transferred
  total?: number;   // undefined for responses of unknown length
}
```

---

## Migrating from 1.x

| 1.x | 2.x |
|-----|-----|
| `provideMockResourceBus()` | Remove it; the runtime installs itself |
| `provideMockResource(TOKEN, 'KEY', behavior)`, `provideMockObservable`, `provideMockHttpEvents` | `provideMockEndpoint(KEY_MOCK, behavior)` for every client type |
| Mock config **replaces** the real providers | Mock config is **added** to the real one; keep `provideHttpClient()`, the tokens and the base URL |
| Mock providers in a component's `providers` | App or route `providers` (`EnvironmentProviders`) |
| `{ value: DeepPartial<T> }` | `{ value: T }` — complete fixtures |
| `mockResource(TOKEN, …)`, `mockObservable`, `mockHttpEvents` | `mockEndpoint(KEY_MOCK, …)` plus `provideHttpClient()` |
| `handle.ref.resolve(…)` | `handle.resolve(…)`, then `await fixture.whenStable()` |
| `injectMockResource(key)` | The `mockEndpoint` handle, or `openApiMock(key)` |
| `keyDiscriminator` | Removed: an endpoint is one filter, whatever number of components use it |
| `fail(new Error('x'))` → `resource.error()` is that error | `fail(body, status?)` → an `HttpErrorResponse` with that body |
| Request args = the token function's arguments | [Read from the wire](#request-args): path params are strings, the query comes last |
| A request to an endpoint without a behavior stays idle | It goes to the real API |

Regenerate the libs with a generator version that emits the 2.x mock files.

---

## License

MIT
