# openapi-resource-gen

[![npm](https://img.shields.io/npm/v/@constantant/openapi-resource-gen)](https://www.npmjs.com/package/@constantant/openapi-resource-gen)

Nx generator that reads an OpenAPI 3.x spec and emits one `InjectionToken` per
endpoint, each in its own `.ts` file. The result is a tree-shakeable Angular
data-access library: only tokens that are actually injected end up in the bundle.

## Installation

```bash
npm install -D @constantant/openapi-resource-gen
```

Then register it as a local plugin in your `nx.json` or use it directly:

```bash
npx nx g @constantant/openapi-resource-gen:api-resource --specPath=specs/myapi.yaml --outputDir=libs/myapi-data-access/src
```

## Concept

Each endpoint becomes a typed `InjectionToken` whose value is a factory function.
Calling the token's factory function returns an `httpResource` — Angular 22's
signal-native HTTP wrapper.

```
OpenAPI spec  →  generator  →  one .token.ts per endpoint
                                   └─ InjectionToken + typed factory function
                                   └─ export type Params / Body / Response
```

All types are derived from the generated `schema.d.ts` (via `openapi-typescript`)
so there is zero hand-written interface code and no runtime overhead from a
generated client library.

### Why one file per endpoint?

esbuild performs tree-shaking at the file boundary. A token that is never
`inject()`-ed is never imported, so the entire file is dropped from the bundle.
Bundling all endpoints into a single file would prevent this.

### `providedIn: 'none'` vs `'root'`

| Mode | Token has factory? | How to provide |
|------|--------------------|----------------|
| `'none'` (default) | No | Call the emitted `provide{Name}()` helper in `app.config.ts` or a route provider |
| `'root'` | Yes — self-registers | Just `inject()` it anywhere; Angular handles registration |

`'none'` is the default because it lets you inject the same token with different
`API_BASE_URL` values in different route sub-trees (e.g. staging vs production,
or different micro-frontends). `'root'` is simpler but prevents per-scope
base URL overrides.

---

## Running the generator

If installed as a dev dependency (`@constantant/openapi-resource-gen`):

```bash
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src
```

In this monorepo (local workspace plugin registered via npm workspaces):

```bash
npx nx g openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src
```

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `specPath` | yes | — | Path to the OpenAPI 3.x YAML or JSON spec file |
| `outputDir` | yes | — | Output directory relative to the workspace root |
| `baseUrlToken` | no | `API_BASE_URL` | Name of the base-URL `InjectionToken` emitted alongside the endpoint tokens |
| `tagFilter` | no | all tags | Comma-separated list of OpenAPI tags to include |
| `namingConvention` | no | `kebab` | `kebab` → `find-pets-by-status.token.ts`; `camel` → `findPetsByStatus.token.ts` |
| `providedIn` | no | `none` | `none` or `root` — see table above |

---

## Output structure

```
{outputDir}/
  schema.d.ts                    # openapi-typescript output, never edit manually
  api-base-url.token.ts          # InjectionToken<string> for the API root URL
  index.ts                       # re-exports all tag barrels + api-base-url.token
  {tag}/
    index.ts                     # re-exports all token files in this tag folder
    {operation-id}.token.ts      # one file per endpoint
```

Tags map to subfolders; untagged operations go into `default/`.

---

## Generated token anatomy

### GET with query params — `find-pets-by-status.token.ts`

```typescript
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
        httpResource<FindPetsByStatusResponse>(() => ({
          url: `${base}/pet/findByStatus`,
          params: (typeof params === 'function' ? params() : params) as ...,
        }));
    },
  };
}
```

### GET with path params — `repos-get.token.ts`

Path params (`/repos/{owner}/{repo}`) become required positional arguments on
the returned function and are interpolated into the URL template:

```typescript
export const REPOS_GET = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<ReposGetResponse>>
>('REPOS_GET');
```

### Mutation (POST/PUT/PATCH/DELETE)

The factory returns `(body: BodyType | Signal<BodyType>) => httpResource(...)`.
The resource config receives `method: 'POST'` and `body` automatically.

---

## Consuming tokens in a component

### 1. Register providers in `app.config.ts`

```typescript
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

  // Pass a thunk so httpResource re-fetches whenever status() changes
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }));
}
```

```html
@if (pets.isLoading()) { <mat-progress-bar mode="indeterminate" /> }
@for (pet of pets.value() ?? []; track pet.id) {
  <p>{{ pet.name }}</p>
}
```

### Reactive params (signal-driven re-fetch)

The `params` argument accepts either a plain object or a **thunk**
`() => ParamsType`. When a thunk is passed it is called inside the
`httpResource` reactive lambda, so any signal reads inside it register as
dependencies — the request re-fires automatically when a signal changes.

---

## Exported types

Every token file exports `Params`, `Body`, and `Response` type aliases so
consumers can derive domain types without duplicating type expressions:

```typescript
import type { FindPetsByStatusParams } from '@angular-openapi-gen/petstore-data-access';

type PetStatus = FindPetsByStatusParams['status']; // 'available' | 'pending' | 'sold'
```

---

## Adding a new data-access lib

1. Fetch the spec into `specs/`:
   ```bash
   curl -L https://example.com/openapi.yaml -o specs/myapi.yaml
   ```

2. Run the generator:
   ```bash
   npx nx g openapi-resource-gen:api-resource \
     --specPath=specs/myapi.yaml \
     --outputDir=libs/myapi-data-access/src
   ```

3. Create `libs/myapi-data-access/package.json` (or add a path alias to
   `tsconfig.base.json`) so the lib is importable as
   `@angular-openapi-gen/myapi-data-access`.

4. Add base URL provider and token providers to `app.config.ts`.

To regenerate after a spec update, re-run the same command — the generator
overwrites all files in `outputDir`.

---

## Implementation notes

| Step | Tool | Purpose |
|------|------|---------|
| Spec loading | `js-yaml` + custom `stripNonSchemaRefs()` | Handle YAML and remove non-spec `$ref` links (markdown, images) that would break parsing |
| Type generation | `openapi-typescript` CLI | Emit `schema.d.ts` — the single source of truth for all request/response types |
| Spec dereferencing | `@apidevtools/swagger-parser` | Resolve all `$ref` chains for endpoint extraction |
| Code generation | `@nx/devkit` `generateFiles()` + inline string building | EJS template for `api-base-url.token.ts`; direct string assembly for token files |
| Formatting | `@nx/devkit` `formatFiles()` | Runs Prettier over all written files |

Hyphenated path parameter names (e.g. `{enterprise-team}` in the GitHub spec)
are converted to camelCase in the function signature and the URL template via
`toCamelCase()` to produce valid JavaScript identifiers.
