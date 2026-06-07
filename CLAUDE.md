# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# OpenAPI Resource Generator — Nx Workspace

Angular 22 · Nx monorepo · InjectionToken-based REST data access from OpenAPI specs via `httpResource`.

> **Implementation status**: Core generator is built and published to npm as `@constantant/openapi-resource-gen` (v1.2.0). Data-access libs: `github`, `petstore`, `weather`, `youtube`. `apps/api-explorer` is wired up with routes and Angular Material UI.

---

## Project goal

Build an Nx generator (`openapi-resource-gen`) that reads an OpenAPI 3.x spec and emits one
`InjectionToken` per endpoint, each in its own `.ts` file, enabling maximum tree-shaking.
Validate the approach with a demo Angular 22 app (`api-explorer`) that consumes multiple
real-world APIs but ships only the endpoints it actually injects.

---

## Workspace layout

```
apps/
  api-explorer/               # Angular 22 standalone app, zoneless, OnPush default

libs/
  github-data-access/         # generated — github/rest-api-description
  petstore-data-access/       # generated — OAI petstore spec
  weather-data-access/        # generated — Open-Meteo forecast API
  youtube-data-access/        # generated — YouTube Data API v3 (76 endpoints)

tools/
  openapi-resource-gen/       # Nx plugin (generator + schema), published as @constantant/openapi-resource-gen
    src/
      generators/
        api-resource/
          schema.json
          generator.ts
          parse-spec.ts
          render-token.ts
          endpoint-model.ts
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
  Returns `undefined` from the lambda to suppress the request entirely (resource stays idle).
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

### GET with query params (`providedIn: 'none'` — the default)

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

Rules:
- GET + query params uses **block-body lambda** with `_params` pre-computation and early `return undefined` guard — this makes `httpResource` idle when the thunk returns `undefined`. Shorthand `() => ({...})` would always fire because the lambda always returns an object.
- `inject()` inside factory only — no constructor DI.
- Types always sourced from `paths[...]['get']['responses']['200'][...]` — never hand-written.
- Mutations (POST/PUT/PATCH/DELETE): factory returns `(body: Signal<T> | T) => httpResource(...)`,
  add `method: 'POST'` (etc.) and `body` to the resource config.
- Path params (e.g. `/pets/{id}`): become required args on the returned function,
  interpolated into the URL string inside the reactive lambda.

### Security tokens

When the spec has security schemes, the generator emits one additional file per scheme.
Two different patterns are used depending on the scheme kind.

**Signal-based** (`bearer`, `oauth2`, `openIdConnect`, `basic`, `apiKey-header`, `apiKey-query`) —
emits `InjectionToken<Signal<string | null>>`. Endpoint tokens inject these optionally and
merge auth into the request headers/params:

```typescript
// libs/youtube-data-access/src/oauth2.security-token.ts
import { InjectionToken, Signal } from '@angular/core';
export const OAUTH2 = new InjectionToken<Signal<string | null>>('OAUTH2');
```

```typescript
const oauth2 = inject(OAUTH2, { optional: true }); // Signal<string | null> | null
// In the reactive lambda:
headers: {
  ...(oauth2?.() != null ? { Authorization: `Bearer ${oauth2()}` } : {}),
},
```

**Interceptor-based** (`digest`) — Digest is a challenge-response protocol (URL + method +
nonce hash) that cannot be computed as a static header. The generator emits
`InjectionToken<HttpInterceptorFn>` plus a **named, host-scoped interceptor wrapper**:

```typescript
// libs/myapi-data-access/src/digest-auth.security-token.ts
import { InjectionToken, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MYAPI_BASE_URL } from './api-base-url.token';

export const DIGEST_AUTH = new InjectionToken<HttpInterceptorFn>('DIGEST_AUTH');

export const myapiDigestAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const base = inject(MYAPI_BASE_URL);
  if (!req.url.startsWith(base)) return next(req); // scoped to this API only
  const fn = inject(DIGEST_AUTH, { optional: true });
  if (!fn) return next(req);
  return fn(req, next); // req.urlWithParams, req.method, req.body available
};
```

The interceptor name is derived from the base URL token (`MYAPI_BASE_URL` → `myapi`) and the
scheme name, making it unique per API. Multiple APIs with digest auth have distinct interceptors
and distinct base URL checks — no cross-API conflicts. The consumer's implementation receives
the full `HttpRequest`, which carries everything needed for the RFC 7616 hash.

Consumer wires it in `app.config.ts`:

```typescript
provideHttpClient(withInterceptors([myapiDigestAuthInterceptor])),
{ provide: DIGEST_AUTH, useValue: myDigestInterceptorFn },
```

---

## Generator implementation notes

### Parsing pipeline

1. `js-yaml` + `stripNonSchemaRefs()` — load YAML, strip non-spec `$ref` links (markdown, images).
2. `openapi-typescript` (programmatic API) — emit `schema.d.ts` from the cleaned spec.
3. `@apidevtools/swagger-parser` — dereference all `$ref` chains for endpoint extraction.
4. `parseSecuritySchemes(api)` — extract security schemes into `SecuritySchemeModel[]`.
5. `buildEndpoints(api, tags, convention)` — map each operation to `EndpointModel`.
6. `renderTokenFile()` / `renderSecurityTokenFile()` — emit token files as strings.
7. `@nx/devkit` `formatFiles()` — run Prettier over all written files.

### Schema inputs (`schema.json`)

```json
{
  "specPath":        "path to the OpenAPI YAML/JSON file",
  "outputDir":       "output directory inside libs/",
  "baseUrlToken":    "optional: name of the base URL token (default: API_BASE_URL)",
  "tagFilter":       "optional: only generate tokens for these tags",
  "namingConvention":"camel | kebab (default: kebab for filenames, SCREAMING_SNAKE for token names)",
  "providedIn":      "none | root (default: none)"
}
```

### Tag → folder mapping

- Each OpenAPI tag becomes one subfolder under `outputDir`.
- Untagged operations go into `default/`.
- Each folder gets its own `index.ts` barrel.
- Root `index.ts` re-exports all folder barrels + security token files.

---

## Demo app: api-explorer

### Routes

| Path       | Component               | Tokens injected                           | Source lib           |
|------------|-------------------------|-------------------------------------------|----------------------|
| `/`        | `DashboardComponent`    | `GET_USER`, `LIST_REPOS`, `FIND_PETS_BY_STATUS`, `GET_V1_FORECAST` | multiple |
| `/repos`   | `ReposPageComponent`    | `GET_USER`, `LIST_REPOS`                  | github-data-access   |
| `/pets`    | `PetsPageComponent`     | `FIND_PETS_BY_STATUS`                     | petstore-data-access |
| `/weather` | `WeatherPageComponent`  | `GET_V1_FORECAST`                         | weather-data-access  |
| `/youtube` | `YoutubePageComponent`  | `YOUTUBE_SEARCH_LIST`                     | youtube-data-access  |

### Angular Material usage

- `MatToolbar` — top app bar
- `MatSidenav` / `MatNavList` — navigation rail
- `MatCard` — content panels
- `MatChipListbox` / `MatChip` — status filter chips
- `MatTable` + `MatPaginator` — data lists
- `MatProgressBar` — loading indicator
- `MatFormField` / `MatInput` — search and auth key input

---

## OpenAPI specs used

| Lib                    | Spec source                                            | Endpoints  |
|------------------------|--------------------------------------------------------|------------|
| `github-data-access`   | `github/rest-api-description` — `api.github.com.yaml` | ~38 used   |
| `petstore-data-access` | OAI Petstore v3                                        | 12         |
| `weather-data-access`  | Open-Meteo forecast API                                | ~5 used    |
| `youtube-data-access`  | YouTube Data API v3                                    | 76 (all)   |

Fetch commands:
```bash
# GitHub
curl -L https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.yaml \
  -o specs/github.yaml

# Petstore
curl -L https://petstore3.swagger.io/api/v3/openapi.yaml \
  -o specs/petstore.yaml

# YouTube Data API v3
curl -L https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/googleapis.com/youtube/v3/openapi.yaml \
  -o specs/youtube.yaml
```

---

## Common commands

```bash
# Development
npx nx serve api-explorer                  # Dev server on http://localhost:4200

# Build
npx nx build api-explorer                  # Production build
npx nx build api-explorer --stats-json     # Include esbuild bundle stats

# Test
npx nx test api-explorer                   # Run unit tests (Vitest)
npx nx e2e api-explorer-e2e               # Run Playwright E2E tests
npx nx test openapi-resource-gen           # Run generator unit tests

# Lint / format
npx nx run-many -t lint                    # Lint all projects
npx prettier --write apps/                 # Format code

# Type-check all
npx nx run-many -t typecheck

# Generate a data-access lib from a spec
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/youtube.yaml \
  --outputDir=libs/youtube-data-access/src \
  --baseUrlToken=YOUTUBE_BASE_URL

# Inspect bundle after build with --stats-json
npx webpack-bundle-analyzer dist/apps/api-explorer/browser/stats.json
```

---

## Coding conventions

> **CRITICAL — generated code is read-only.**
> Files under `libs/*/src/` are 100% machine-generated and must **never** be edited by hand.
> Any bug or missing feature in a generated file must be fixed in the generator
> (`tools/openapi-resource-gen/`) and then the affected lib must be regenerated with
> `npx nx g @constantant/openapi-resource-gen:api-resource ...`.
> The `node_modules/@constantant/openapi-resource-gen` package is a Windows Junction that points
> directly at `tools/openapi-resource-gen`, so generator changes are live immediately — no publish step needed.

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

## Repository & contribution governance

This is a **public, MIT-licensed** repo open to outside contributions. Community
health files live at the root and under `.github/`:

- `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`
- `.github/CODEOWNERS` (`* @constantant`), `.github/dependabot.yml`
- `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/*` (YAML forms)

`master` is **branch-protected** — no direct pushes; all changes go via PR:
- the CI `main` job must pass,
- 1 approving **code-owner** review is required,
- **linear history** (squash/rebase merges only — no merge commits),
- `enforce_admins` is **off** so the release workflow's `GITHUB_TOKEN` can still
  push the version bump commit + tag during `nx release`.

When making changes here, branch off `master` and open a PR; use a
Conventional Commits PR title (it becomes the squash commit). See
`CONTRIBUTING.md` for the full workflow.

---

## Key decisions

| Decision | Choice                                              | Reason |
|----------|-----------------------------------------------------|--------|
| Token granularity | One file per endpoint                               | Enables file-level tree-shaking by esbuild |
| Type source | `openapi-typescript` `paths` type                   | Zero runtime, fully typed, no codegen bloat |
| HTTP primitive | `httpResource` (stable, Angular 22)                 | Signal-native, auto-cancels stale requests |
| Mutation pattern | Factory returns `(body) => httpResource(...)`       | Consistent API surface for GET and mutations |
| Base URL injection | Named `InjectionToken<string>` per lib              | Lets apps override URL per environment |
| Params type | Typed via `paths[...]['parameters']['query']`       | Full type safety, no manual interfaces |
| Request suppression | Block-body lambda with early `return undefined`     | Shorthand `() => ({url})` always fires; returning undefined from lambda makes resource idle |
| Security tokens — signal | `InjectionToken<Signal<string | null>>` per scheme | `bearer`/`basic`/`apiKey`: reactive — changing the signal auto-refires any resource that reads it |
| Security tokens — digest | `InjectionToken<HttpInterceptorFn>` + named host-scoped interceptor | Challenge-response at HTTP layer; base URL token prevents cross-API interceptor conflicts |
| Lint cache invalidation | `@nx/eslint:lint` has an `externalDependencies` input listing the ESLint plugin packages (`eslint`, `angular-eslint`, `typescript-eslint`, `@eslint/js`, …) in `nx.json` | A rule-strengthening dependency bump (e.g. an `angular-eslint` major) must re-lint against current source, not return a stale cached "pass". Without this, the angular-eslint 22 upgrade merged green while leaving `master` failing `prefer-on-push-component-change-detection` |

---

## Reference links

- Angular 22 release notes: https://angular.dev/events/v22
- `httpResource` docs: https://angular.dev/guide/http/http-resource
- `InjectionToken` docs: https://angular.dev/api/core/InjectionToken
- Nx generator guide: https://nx.dev/extending-nx/recipes/local-generators
- `openapi-typescript`: https://openapi-ts.dev
- `@apidevtools/swagger-parser`: https://apitools.dev/swagger-parser
- Angular Material: https://material.angular.dev
- YouTube Data API v3 spec: https://developers.google.com/youtube/v3
