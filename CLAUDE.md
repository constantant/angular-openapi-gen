# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# OpenAPI Resource Generator — Nx Workspace

Angular 22 · Nx monorepo · InjectionToken-based REST data access from OpenAPI specs via `httpResource`.

> **Implementation status**: Core generator is built and published to npm as `@constantant/openapi-resource-gen` (v1.1.2). All five data-access libs (`github`, `petstore`, `travel`, `stripe`, `weather`) are generated. `apps/api-explorer` is wired up with routes and Angular Material UI. The demo app, bundle inspector, and full Angular Material polish described below may still be in progress.

---

## Project goal

Build an Nx generator (`openapi-resource-gen`) that reads an OpenAPI 3.x spec and emits one
`InjectionToken` per endpoint, each in its own `.ts` file, enabling maximum tree-shaking.
Validate the approach with a demo Angular 22 app (`api-explorer`) that consumes four
real-world APIs but ships only the endpoints it actually injects.

---

## Workspace layout

```
apps/
  api-explorer/               # Angular 22 standalone app, zoneless, OnPush default

libs/
  github-data-access/         # generated — github/rest-api-description
  petstore-data-access/       # generated — OAI petstore spec
  travel-data-access/         # generated — Train Travel API (bump.sh)
  stripe-data-access/         # generated — stripe/openapi spec3.yaml

tools/
  openapi-resource-gen/       # Nx plugin (generator + schema)
    src/
      generators/
        api-resource/
          schema.json
          generator.ts
          files/              # EJS templates
            __tag__/
              __operationId__.token.ts__tmpl__
            api-base-url.token.ts__tmpl__
            index.ts__tmpl__
```

---

## Angular 22 key APIs in use

- `httpResource()` — stable (Angular 22). Reactive wrapper around `HttpClient`.
  Returns `HttpResourceRef<T>` with `.value()`, `.isLoading()`, `.error()` signals.
  The lambda re-runs whenever signals inside it change (like `switchMap` but declarative).
- `@Service()` decorator — stable (Angular 22). Replaces `@Injectable({ providedIn: 'root' })`.
  Default behaviour is root-scoped singleton, tree-shakeable.
- `OnPush` — now the default `ChangeDetectionStrategy`. New components get it automatically.
  Use `ChangeDetectionStrategy.Eager` only for legacy interop.
- `InjectionToken` with factory — tree-shakeable when `providedIn: 'root'` and factory uses
  `inject()` internally. This is the core pattern of every generated token file.
- Signal Forms (`form()` + `FormField` directive) — stable (Angular 22). Use for mutation pages.
- Zoneless — default for new projects. No `zone.js` import needed.

---

## Generated token pattern (canonical)

Every generated file MUST follow this exact structure:

```typescript
// libs/petstore-data-access/src/pets/list-pets.token.ts
import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { API_BASE_URL } from '../api-base-url.token';

type ListPetsParams =
  paths['/pets']['get']['parameters']['query'];
type ListPetsResponse =
  paths['/pets']['get']['responses']['200']['content']['application/json'];

export const LIST_PETS = new InjectionToken<
  (params?: ListPetsParams) => ReturnType<typeof httpResource<ListPetsResponse>>
>('LIST_PETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(API_BASE_URL);
    return (params?) =>
      httpResource<ListPetsResponse>(() => ({
        url: `${base}/pets`,
        params: params as Record<string, string>,
      }));
  },
});
```

Rules:
- `providedIn: 'root'` on every token — self-registering, tree-shakeable.
- `inject()` inside factory only — no constructor DI.
- Types always sourced from `paths[...]['get']['responses']['200'][...]` — never hand-written.
- Mutations (POST/PUT/PATCH/DELETE): factory returns `(body: Signal<T> | T) => HttpResourceRef<R>`,
  add `method: 'POST'` (etc.) and `body` to the resource config.
- Path params (e.g. `/pets/{id}`): become required args on the returned function,
  interpolated into the URL string inside the reactive lambda.

---

## Generator implementation notes

### Parsing pipeline

1. `@apidevtools/swagger-parser` — validate + fully dereference `$ref` chains.
2. `openapi-typescript` (CLI) — emit `schema.d.ts` from the spec.
3. Custom `EndpointModel[]` builder — maps each operation to:
   `{ tag, operationId, method, path, pathParams, queryType, bodyType, responseType }`
4. `generateFiles()` from `@nx/devkit` — render EJS templates per endpoint.

### Schema inputs (`schema.json`)

```json
{
  "specPath":        "path to the OpenAPI YAML/JSON file",
  "outputDir":       "output directory inside libs/",
  "baseUrlToken":    "optional: name of the base URL token (default: API_BASE_URL)",
  "tagFilter":       "optional: only generate tokens for these tags",
  "namingConvention":"camel | kebab (default: kebab for filenames, SCREAMING_SNAKE for token names)"
}
```

### Tag → folder mapping

- Each OpenAPI tag becomes one subfolder under `outputDir`.
- Untagged operations go into `default/`.
- Each folder gets its own `index.ts` barrel.
- Root `index.ts` re-exports all folder barrels.

---

## Demo app: api-explorer

### Routes

| Path         | Component              | Tokens injected                        | Source lib               |
|--------------|------------------------|----------------------------------------|--------------------------|
| `/`          | `DashboardComponent`   | `LIST_REPOS`, `LIST_PETS`, `LIST_TRIPS`, `LIST_INVOICES`, `GET_USER`, `LIST_BOOKINGS` | all four libs |
| `/repos`     | `ReposPageComponent`   | `LIST_REPOS`, `GET_USER`               | github-data-access       |
| `/pets`      | `PetsPageComponent`    | `LIST_PETS`, `FIND_PETS_BY_STATUS`     | petstore-data-access     |
| `/travel`    | `TravelPageComponent`  | `LIST_TRIPS`, `LIST_BOOKINGS`          | travel-data-access       |
| `/payments`  | `PaymentsPageComponent`| `LIST_INVOICES`                        | stripe-data-access       |

### Tree-shaking proof

The app intentionally imports all four data-access libs in `package.json` but only injects
a handful of the ~250 available tokens. The dashboard shows a live bundle bar:

- Blue segment = injected tokens (~3.1 kB for 6 tokens)
- Gray segment = tree-shaken tokens (0 kB — 244 tokens never referenced)

A `BundleInspectorComponent` (dev mode only) reads `stats.json` from the esbuild output
and renders the breakdown. Disable it with `SHOW_BUNDLE_INSPECTOR=false` in `environment.ts`.

### Angular Material usage

- `MatToolbar` — top app bar
- `MatSidenav` / `MatNavList` — navigation rail (collapsed to icons, labels on hover)
- `MatCard` — metric cards + content panels
- `MatChipListbox` / `MatChip` — status filter chips (available / pending / sold)
- `MatTable` + `MatPaginator` — data lists on detail pages
- `MatProgressBar` — bundle visualization bar
- `MatBadge` — token count badges on nav items
- `MatTooltip` — token name shown on hover over shaken tokens

---

## OpenAPI specs used

| Lib                    | Spec source                                              | Endpoints |
|------------------------|----------------------------------------------------------|-----------|
| `github-data-access`   | `github/rest-api-description` — `api.github.com.yaml`   | ~38 used  |
| `petstore-data-access` | OAI Petstore v3                                          | 12        |
| `travel-data-access`   | Train Travel API (bump.sh modern petstore replacement)   | 9         |
| `stripe-data-access`   | `stripe/openapi` — `openapi/spec3.yaml`                  | ~188      |

Fetch commands:
```bash
# GitHub
curl -L https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.yaml \
  -o specs/github.yaml

# Petstore
curl -L https://petstore3.swagger.io/api/v3/openapi.yaml \
  -o specs/petstore.yaml

# Train Travel
curl -L https://raw.githubusercontent.com/bump-sh-examples/train-travel-api/main/openapi.yaml \
  -o specs/travel.yaml

# Stripe
curl -L https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml \
  -o specs/stripe.yaml
```

---

## Common commands

```bash
# Development
npx nx serve api-explorer                  # Dev server on http://localhost:4200

# Build
npx nx build api-explorer                  # Production SSR build
npx nx build api-explorer --stats-json     # Include esbuild bundle stats

# Test
npx nx test api-explorer                   # Run all unit tests (Vitest)
npx nx test api-explorer --testFile=apps/api-explorer/src/app/app.spec.ts  # Single file
npx nx e2e api-explorer-e2e               # Run Playwright E2E tests

# Lint / format
npx nx lint api-explorer                   # Lint one project
npx nx run-many -t lint                    # Lint all projects
npx prettier --write apps/                 # Format code

# Type-check all
npx nx run-many -t typecheck

# Generate a data-access lib from a spec (once generator is built)
npx nx g openapi-resource-gen:api-resource \
  --specPath=specs/stripe.yaml \
  --outputDir=libs/stripe-data-access/src \
  --tagFilter=invoices,customers

# Inspect bundle after build with --stats-json
npx webpack-bundle-analyzer dist/apps/api-explorer/browser/stats.json

# Run generator unit tests
npx nx test openapi-resource-gen
```

---

## Coding conventions

- All new components: standalone, no `NgModule`, no `zone.js`.
- Change detection: `OnPush` is the default — do NOT set it explicitly unless overriding.
- Signals: prefer `signal()` + `computed()` over RxJS for local state.
- `httpResource` for all HTTP reads. For mutations, use `httpResource` with `method` set.
- No services for data fetching — inject tokens directly in components.
- Template syntax: use `@if`, `@for`, `@switch` (Angular 17+ control flow). No `*ngIf`.
- Imports: always import from the barrel `index.ts` of a lib, never from internal paths.
- Do not add `console.log` to committed code.
- Commit messages: `feat:`, `fix:`, `chore:`, `docs:` prefixes.

---

## Key decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Token granularity | One file per endpoint | Enables file-level tree-shaking by esbuild |
| Type source | `openapi-typescript` `paths` type | Zero runtime, fully typed, no codegen bloat |
| HTTP primitive | `httpResource` (stable, Angular 22) | Signal-native, auto-cancels stale requests |
| Mutation pattern | Factory returns `(body) => httpResource(...)` | Consistent API surface for GET and mutations |
| Base URL injection | `API_BASE_URL` `InjectionToken` per lib | Lets apps override URL per environment |
| Params type | Typed via `paths[...]['parameters']['query']` | Full type safety, no manual interfaces |

---

## Reference links

- Angular 22 release notes: https://angular.dev/events/v22
- `httpResource` docs: https://angular.dev/guide/http/http-resource
- `InjectionToken` docs: https://angular.dev/api/core/InjectionToken
- Nx generator guide: https://nx.dev/extending-nx/recipes/local-generators
- `openapi-typescript`: https://openapi-ts.dev
- `@apidevtools/swagger-parser`: https://apitools.dev/swagger-parser
- Angular Material: https://material.angular.dev
- Stripe OpenAPI spec: https://github.com/stripe/openapi
- Train Travel API spec: https://bump.sh/blog/modern-openapi-petstore-replacement
