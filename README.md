# angular-openapi-gen

[![CI](https://github.com/constantant/angular-openapi-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/constantant/angular-openapi-gen/actions/workflows/ci.yml)
[![npm: openapi-resource-gen](https://img.shields.io/npm/v/@constantant/openapi-resource-gen?label=openapi-resource-gen)](https://www.npmjs.com/package/@constantant/openapi-resource-gen)
[![npm: openapi-resource-mocks](https://img.shields.io/npm/v/@constantant/openapi-resource-mocks?label=openapi-resource-mocks)](https://www.npmjs.com/package/@constantant/openapi-resource-mocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Angular 20+](https://img.shields.io/badge/Angular-20%2B-dd0031?logo=angular&logoColor=white)](#compatibility)

**Tree-shakeable, signal-native Angular API clients from OpenAPI: one `InjectionToken` per endpoint.**
Mock any of them, in unit tests, Playwright or the browser, even on a production build.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/constantant/angular-openapi-gen/tree/master/examples/stackblitz)

```bash
npm install -D @constantant/openapi-resource-gen
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src --baseUrlToken=PETSTORE_BASE_URL
```

```typescript
private findPets = inject(FIND_PETS_BY_STATUS);
readonly status = signal<'available' | 'sold'>('available');

// An httpResource: refetches when status() changes, typed from the spec.
readonly pets = this.findPets(() => ({ status: this.status() }));
```

## Why this one

- **Pay only for what you call.** Each endpoint is its own file and its own token. There is no
  service class to inject whole, so an endpoint you never `inject()` costs 0 bytes (8 endpoints cost
  about 0.2 kB more than 1; [benchmark](docs/benchmarks/bundle-size.md)).
- **Signals first, `HttpClient` when you want it.** Tokens return an `httpResource` by default, or a
  cold `Observable` per endpoint (`--clientType`, `--httpClientTags`).
- **Types from the spec, not model classes.** [`openapi-typescript`](https://openapi-ts.dev) output
  is the single source of truth; the generated code adds no runtime types.
- **Runtime safety you can switch on.** Validate responses against the spec
  (`--validateResponses`), keep server-only fields out of request bodies (`--readWriteMarkers`),
  revive dates (`--dateType`).
- **Testing is built in.** `@constantant/openapi-resource-mocks` patches `fetch` and
  `XMLHttpRequest` (no service worker), so your real tokens, interceptors and validation keep
  running. Unit tests, Playwright and a Chrome DevTools panel all drive the same mocks.
- **Works with specs you do not own.** Overlays, operation filters, redirect (OAuth) endpoints as URL
  builders, server variables and Swagger 2.0 input are generator options, not hand edits.
- **CI-friendly.** `--check` fails the build when the generated code is out of date.
  Every file is marked `GENERATED`.

### How it compares

An honest summary. All of these are good tools; pick by what you need.

| | This project | [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) | [Orval](https://orval.dev) | [Hey API](https://heyapi.dev) |
|---|---|---|---|---|
| Output shape | One token + function per endpoint | Service classes + model classes | Functions or services, per config | SDK functions / classes, plugins |
| `httpResource` | Yes (default) | Declined upstream | Yes (`httpClient`, `httpResource` or both) | Yes |
| `HttpClient` / `Observable` | Yes, per endpoint | Yes | Yes | Yes |
| Runs as | Nx generator, or standalone CLI | Standalone CLI | Standalone CLI | Standalone CLI |
| Mock data / Zod / validators | In-browser mocks, MSW handlers, response validation (opt-in) | No | MSW + Faker, Zod (including request bodies) | Faker, MSW, validator plugins |
| Debug UI | Chrome DevTools panel | No | No | No |

Where the others are the better fit: if you need **Zod schemas for request bodies** or **generated
fake data**, Orval and Hey API have them and we do not; if you want a **non-Angular** client, this is
not the tool. The default `httpResource` flavour carries Angular's own `httpResource` runtime
(about +7 kB gzip); `--clientType=httpClient` is the small option.
(Comparison read in October 2026; tools change, so check their docs.)

Coming from another tool? [From ng-openapi-gen](docs/06-migrate-from-ng-openapi-gen.md) ·
[From Orval](docs/07-migrate-from-orval.md).

---

## The packages

| Package | What it is | Docs |
|---|---|---|
| [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen) | Generator (Nx plugin and `npx openapi-resource-gen` CLI): spec in, one token per endpoint out | [README](tools/openapi-resource-gen/README.md) |
| [`@constantant/openapi-resource-mocks`](https://www.npmjs.com/package/@constantant/openapi-resource-mocks) | Mocks for generated endpoints: unit tests, Playwright, the browser | [README](tools/openapi-resource-mocks/README.md) |
| OpenAPI Resource Mocks DevTools | Chrome DevTools panel: catch, answer and replay requests | [README](tools/openapi-resource-devtools/README.md) |

The repo is an Angular 22 + Nx monorepo. `apps/api-explorer` is a demo app that consumes four
generated libs (GitHub, Petstore, Open-Meteo, YouTube with 76 endpoints) and ships only the
endpoints it injects.

---

## Quick start

**1. Generate** a data-access lib from a local file or an `https://` URL (command above). Re-run it
whenever the spec changes; it rewrites changed files and deletes the ones whose endpoint is gone.
Without Nx: `npx openapi-resource-gen specs/petstore.yaml --outputDir src/api`.

**2. Provide** the base URL and the endpoints you use:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    provideFindPetsByStatus(),
  ],
};
```

**3. Inject and use.** Pass a thunk to react to signals; return `undefined` from it to hold the
request until you are ready:

```typescript
readonly results = this.search(() =>
  this.apiKey() && this.query() ? { q: this.query(), key: this.apiKey()! } : undefined,
);
```

```html
@if (pets.isLoading()) { <mat-progress-bar mode="indeterminate" /> }
@for (pet of pets.value() ?? []; track pet.id) { <p>{{ pet.name }}</p> }
```

Path, header and cookie params become typed arguments, mutations take a body (or a signal of one),
and auth schemes become `InjectionToken<Signal<string | null>>`s that tokens read for you. The
[tutorials](docs/README.md) walk through each of these; [Generated token anatomy](tools/openapi-resource-gen/README.md#generated-token-anatomy)
shows the code behind them.

### Most-used options

| Option | What it does |
|---|---|
| `--includeMocks` | A `*.mock.ts` per endpoint for `@constantant/openapi-resource-mocks` |
| `--validateResponses` | Check JSON responses against the spec at runtime |
| `--clientType=httpClient` | `Observable`-returning tokens (per endpoint: `--httpClientTags`, `--httpClientOperations`) |
| `--callOptions` | A trailing per-call `options` argument (`HttpContext`, headers, `defaultValue`, ...) |
| `--overlay`, `--includeOperations`, `--excludeOperations` | Fix or trim a spec you do not own |
| `--check` | CI gate: exit non-zero when the generated output is out of date |

All 29 options, with defaults, are in the [generator README](tools/openapi-resource-gen/README.md#options).

---

## Mocks

`@constantant/openapi-resource-mocks` answers the requests of the endpoints you mock, inside the
page. Your app keeps its real tokens, `HttpClient`, interceptors and response validation, and every
other request reaches the real API.

```typescript
// Unit test (Vitest or Jasmine)
const pets = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [] });
TestBed.configureTestingModule({ providers: [provideHttpClient(), pets] });
// ...
pets.expectCalledWith({ status: 'available' });
```

```typescript
// Playwright, against a production build: no mock code in the app
const api = await installOpenApiMocks(page, { baseUrl, endpoints: ENDPOINTS, strict: true });
await api.endpoint('GET_PET_BY_ID').failWith(404, { message: 'no pet' });
await page.goto('/pets/7');
```

- Behaviors: `{ value }`, `{ error, status }`, `{ loading: true }`, `{ sequence: [...] }`, each with
  `delay`, `headers` and simulated upload/download `progress`.
- **Live edits:** changing a mock re-runs the resources already on screen.
- Entry points: `/testing` (unit tests), `/playwright` (E2E on any build), `/runtime` (no Angular).
- Optional [MSW 2.x handlers](tools/openapi-resource-gen/README.md#msw-handlers---includemswhandlers)
  with `--includeMswHandlers`.

Full API: [mocks README](tools/openapi-resource-mocks/README.md).
Tutorials: [unit tests](docs/03-unit-tests.md) · [Playwright E2E](docs/04-e2e-tests.md).

---

## Chrome DevTools extension

A DevTools panel for the mocks above. It lists every mocked endpoint with live state and lets you
resolve, fail, hold (catch mode) or reset it without touching code. With **Intercept** switched on
for a site it works on an unmodified **production build**: the extension installs the mock runtime
itself, and you can create mocks for any operation of an imported spec.

- **Respond tab:** JSON editor, schema-aware example generation, validation, AI-assisted fixtures
- **History tab:** every request with its filled URL, path params, query and body
- **Specs tab:** import an OpenAPI file or URL; the panel suggests the base URL from observed traffic
- **Scenarios:** save and share a whole mock state as JSON

> **Chrome Web Store:** pending review. Until then, build it and use **Load unpacked**:
> `npm ci`, `npx nx run openapi-resource-devtools:build`, then `chrome://extensions` →
> Developer mode → Load unpacked → `dist/tools/openapi-resource-devtools/`.

Guide: [Chrome DevTools Extension](docs/05-devtools.md) · reference:
[extension README](tools/openapi-resource-devtools/README.md).

---

## Compatibility

Every range below is exercised in CI ([`compat.yml`](.github/workflows/compat.yml); run locally with
`npm run compat -- angular 21` or `npm run compat -- nx 22`). Each job builds a throwaway workspace
with that exact version and runs the code under test, including wire-level tests against a real
`HttpClient`.

| What | Supported | Verified against |
|------|-----------|------------------|
| Generated data-access libs (the code the generator emits) | Angular **20+** | 20.0.0, 20.x, 21.x, 22.x |
| `@constantant/openapi-resource-mocks` | Angular **20+** | 20.0.0, 20.x, 21.x, 22.x |
| `@constantant/openapi-resource-gen` (the Nx generator) | Nx **20+** | 20.x, 21.x, 22.x, 23.x |

- Angular 20 is the floor because the mock `Resource` mirrors `ResourceStatus` as string values,
  which Angular 19 declares as a numeric enum. The generated libs alone also compile on 19.2, but
  that range is not supported or CI-tested.
- **Upload progress** (`--reportProgress`) needs an XHR-backed `HttpClient`: the default on Angular
  20 and 21, `provideHttpClient(withXhr())` on 22+.

---

## Tutorials

Step by step, in order: [setup](docs/01-setup.md) · [consuming tokens](docs/02-consuming.md) ·
[unit tests](docs/03-unit-tests.md) · [E2E tests](docs/04-e2e-tests.md) ·
[DevTools](docs/05-devtools.md) · [migrate from ng-openapi-gen](docs/06-migrate-from-ng-openapi-gen.md) ·
[migrate from Orval](docs/07-migrate-from-orval.md).

## Contributing

Contributions are welcome. Read **[CONTRIBUTING.md](CONTRIBUTING.md)** first, in particular: generated
code under `libs/*/src/` is never hand-edited (fix the generator and regenerate). Release steps and
branch protection are documented there too.

[Code of Conduct](CODE_OF_CONDUCT.md) · [Security policy](SECURITY.md) ·
[GitHub Discussions](https://github.com/constantant/angular-openapi-gen/discussions) · [MIT license](LICENSE)
