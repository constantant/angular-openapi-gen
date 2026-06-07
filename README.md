# angular-openapi-gen

[![CI](https://github.com/constantant/angular-openapi-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/constantant/angular-openapi-gen/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@constantant/openapi-resource-gen)](https://www.npmjs.com/package/@constantant/openapi-resource-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Angular 22+](https://img.shields.io/badge/Angular-22%2B-red)](https://angular.dev)

> **Requires Angular 22+ and Nx 22+.**
> The generated code uses [`httpResource()`](https://angular.dev/guide/http/http-resource),
> which is only available from Angular 22 onwards.

An Angular 22 · Nx monorepo that demonstrates **tree-shakeable, signal-native API clients** generated from OpenAPI 3.x specs.

The core idea: one `InjectionToken` per API endpoint, each in its own `.ts` file.
Because esbuild tree-shakes at file boundaries, any token you never `inject()` costs zero bytes in your bundle.

---

## What's in this repo

| Path | Type | Description |
|------|------|-------------|
| `tools/openapi-resource-gen/` | Nx generator · npm package | Reads an OpenAPI spec, emits one token file per endpoint |
| `libs/github-data-access/` | Generated data-access lib | GitHub REST API (~38 endpoints used) |
| `libs/petstore-data-access/` | Generated data-access lib | OAI Petstore v3 (12 endpoints) |
| `libs/weather-data-access/` | Generated data-access lib | Open-Meteo forecast API |
| `libs/youtube-data-access/` | Generated data-access lib | YouTube Data API v3 (76 endpoints) |
| `apps/api-explorer/` | Angular 22 app | Demo app that consumes all data-access libs |

---

## The generator — `@constantant/openapi-resource-gen`

Published on npm: **[`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen)**  
Current version: **1.2.0**

### Quick start

**Step 1 — install the generator** (once per workspace):

```bash
npm install -D @constantant/openapi-resource-gen
```

**Step 2 — generate a data-access lib** from any OpenAPI 3.x spec (local file or URL):

```bash
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL
```

**Step 3 — wire up providers and inject in your component:**

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
import { PETSTORE_BASE_URL, provideFindPetsByStatus } from './libs/petstore-data-access/src';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    provideFindPetsByStatus(),
  ],
};
```

```typescript
// pets-page.component.ts
@Component({ ... })
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);
  readonly status = signal<'available' | 'pending' | 'sold'>('available');
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }));
}
```

Re-run the generator command whenever your spec changes — it overwrites generated files and removes any that no longer exist in the spec.

### Generator options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `specPath` | yes | — | Local path **or** `https://` URL to the OpenAPI 3.x YAML or JSON spec |
| `outputDir` | yes | — | Output directory relative to workspace root |
| `baseUrlToken` | no | `API_BASE_URL` | Name of the base-URL injection token |
| `tagFilter` | no | all tags | Comma-separated list of tags to include |
| `namingConvention` | no | `kebab` | `kebab` or `camel` — controls file names |
| `providedIn` | no | `none` | `none` (use `provideX()` helpers) or `root` (self-registering) |

See [`tools/openapi-resource-gen/README.md`](tools/openapi-resource-gen/README.md) for full documentation.

---

## Generated token pattern

Every endpoint becomes a typed `InjectionToken` whose factory returns an `httpResource`.
For GET endpoints with query params, the reactive lambda uses a block-body form so it can
return `undefined` to suppress the request when a thunk-based params arg returns `undefined`:

```typescript
// libs/petstore-data-access/src/pet/find-pets-by-status.token.ts
import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type FindPetsByStatusParams =
  paths['/pet/findByStatus']['get']['parameters']['query'];
export type FindPetsByStatusResponse =
  paths['/pet/findByStatus']['get']['responses']['200']['content']['application/json'];

export const FIND_PETS_BY_STATUS = new InjectionToken<
  (params?: FindPetsByStatusParams | (() => FindPetsByStatusParams | undefined))
    => ReturnType<typeof httpResource<FindPetsByStatusResponse>>
>('FIND_PETS_BY_STATUS');

export function provideFindPetsByStatus(): FactoryProvider {
  return {
    provide: FIND_PETS_BY_STATUS,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (params?) =>
        httpResource<FindPetsByStatusResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined) return undefined;
          return {
            url: `${base}/pet/findByStatus`,
            params: _params as unknown as Record<string, string | number | boolean | readonly (string | number | boolean)[]>,
          };
        });
    },
  };
}
```

Key properties of every generated file:
- **Zero runtime overhead** — all types come from `schema.d.ts` generated by `openapi-typescript`
- **Tree-shakeable** — a token not injected anywhere is never imported, so esbuild drops the entire file
- **Signal-native** — `httpResource` re-fires the request automatically when any signal inside the reactive lambda changes
- **Request suppression** — returning `undefined` from the lambda keeps the resource idle (no request)
- **Scoped base URL** — each lib has its own `InjectionToken<string>` so different parts of an app can point at different environments
- **Header params** — `in: header` parameters become named string args on the factory function and are merged into the `headers` object alongside any auth scheme headers
- **Security tokens** — signal-based schemes (`bearer`, `basic`, `apiKey`) emit `InjectionToken<Signal<string | null>>`; `digest` schemes emit `InjectionToken<HttpInterceptorFn>` + a named, host-scoped interceptor that delegates only to requests matching the lib's base URL, preventing cross-API conflicts

---

## Using generated tokens

### 1. Register providers in `app.config.ts`

```typescript
import { provideHttpClient } from '@angular/common/http';
import { PETSTORE_BASE_URL, provideFindPetsByStatus } from '@angular-openapi-gen/petstore-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    provideFindPetsByStatus(),
  ],
};
```

### 2. Inject and call in a component

```typescript
@Component({ ... })
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly status = signal<'available' | 'pending' | 'sold'>('available');

  // Thunk → httpResource re-fetches whenever status() changes
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }));
}
```

```html
@if (pets.isLoading()) { <mat-progress-bar mode="indeterminate" /> }
@for (pet of pets.value() ?? []; track pet.id) {
  <p>{{ pet.name }}</p>
}
```

### Conditional requests (thunk returning undefined)

Pass a thunk that returns `undefined` to suppress the request until conditions are met:

```typescript
// No request fires until both apiKey and query are set
readonly results = this.youtubeSearch(() =>
  this.apiKey() && this.query()
    ? { q: this.query(), key: this.apiKey()! }
    : undefined
);
```

---

## Common commands

```bash
# Serve the demo app
npx nx serve api-explorer

# Production build
npx nx build api-explorer
npx nx build api-explorer --stats-json   # include esbuild bundle stats

# Run tests
npx nx test openapi-resource-gen         # generator unit tests
npx nx e2e api-explorer-e2e             # Playwright E2E tests

# Lint everything
npx nx run-many -t lint

# Type-check everything
npx nx run-many -t typecheck

# Generate from a local file
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/myapi.yaml \
  --outputDir=libs/myapi-data-access/src \
  --baseUrlToken=MYAPI_BASE_URL

# Generate from a URL (no curl step needed)
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL

# Or declare a generate target in project.json and run:
npx nx run petstore-data-access:generate
```

---

## Release workflow

The generator is released via the **Release** GitHub Actions workflow (`.github/workflows/release.yml`), triggered manually from the Actions tab.

What the workflow does:
1. Runs `nx release --skip-publish` — determines the version bump from conventional commits (`fix:` → patch, `feat:` → minor), updates `package.json`, writes `CHANGELOG.md`, creates a git commit and tag
2. Pushes the version commit and tag to `master`
3. Creates a GitHub Release with changelog notes extracted from `CHANGELOG.md`
4. Builds the package with `nx build openapi-resource-gen --skip-nx-cache`
5. Publishes to npm as `@constantant/openapi-resource-gen` using `NPM_TOKEN` stored in GitHub secrets

The workflow is idempotent — if the current version is already on npm it skips publishing gracefully.

**Note on nx release commit detection**: nx release counts only commits that touch files within `tools/openapi-resource-gen/`. Workflow-only changes (e.g. editing `.github/`) do not trigger a version bump.

**Note on branch protection**: `master` is protected (PRs require CI + a code-owner review, linear history). Admin enforcement is intentionally left off so the release workflow's `GITHUB_TOKEN` can push the version commit and tag directly during a release.

---

## Contributing

Contributions are welcome! Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** before
opening a PR — in particular the rule that **generated code under `libs/*/src/` is
never hand-edited** (fix the generator and regenerate instead).

- Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Questions & ideas: [GitHub Discussions](https://github.com/constantant/angular-openapi-gen/discussions)

---

## Angular 22 patterns used

- **`httpResource()`** — signal-native HTTP wrapper; re-fires when signals inside its reactive lambda change; returns `undefined` from the lambda to suppress the request
- **`InjectionToken` with factory** — tree-shakeable when `providedIn: 'root'`; or use the emitted `provideX()` helper for scope control
- **Standalone components** — no `NgModule`, no `zone.js`
- **`@if` / `@for` / `@switch`** — Angular 17+ control flow syntax throughout
- **`OnPush`** — default change detection; do not set it explicitly
- **Signals** — `signal()` + `computed()` for all local state; no RxJS in components
