# openapi-resource-gen

[![npm](https://img.shields.io/npm/v/@constantant/openapi-resource-gen)](https://www.npmjs.com/package/@constantant/openapi-resource-gen)

Nx generator that reads an OpenAPI 3.x spec and emits one `InjectionToken` per
endpoint, each in its own `.ts` file. The result is a tree-shakeable Angular
data-access library: only tokens that are actually injected end up in the bundle.

## Installation

```bash
npm install -D @constantant/openapi-resource-gen
```

Then use it directly:

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
               →  one .security-token.ts per security scheme
                                   └─ InjectionToken<Signal<string | null>>
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
base URL values in different route sub-trees (e.g. staging vs production,
or different micro-frontends). `'root'` is simpler but prevents per-scope
base URL overrides.

---

## Running the generator

Pass a local file path or any `https://` URL:

```bash
# From a local file
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL

# From a remote URL (no curl step needed)
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL
```

Re-run the same command whenever your spec changes — the generator overwrites updated files and **deletes any token files that no longer correspond to an endpoint in the spec**.

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `specPath` | yes | — | Local path **or** `https://` URL to the OpenAPI 3.x YAML or JSON spec |
| `outputDir` | yes | — | Output directory relative to the workspace root |
| `baseUrlToken` | no | `API_BASE_URL` | Name of the base-URL `InjectionToken` emitted alongside the endpoint tokens |
| `tagFilter` | no | all tags | Comma-separated list of OpenAPI tags to include |
| `namingConvention` | no | `kebab` | `kebab` → `find-pets-by-status.token.ts`; `camel` → `findPetsByStatus.token.ts` |
| `providedIn` | no | `none` | `none` or `root` — see table above |
| `includeMocks` | no | `false` | Emit a `.mock.ts` per endpoint plus `index.mock.ts` barrels — requires [`@constantant/openapi-resource-mocks`](https://www.npmjs.com/package/@constantant/openapi-resource-mocks) |

---

## Output structure

```
{outputDir}/
  schema.d.ts                       # openapi-typescript output, never edit manually
  api-base-url.token.ts             # InjectionToken<string> for the API root URL
  {scheme}.security-token.ts        # one per security scheme (if any)
  index.ts                          # re-exports all tag barrels + base-url + security tokens
  index.mock.ts                     # (--includeMocks) re-exports all tag mock barrels
  {tag}/
    index.ts                        # re-exports all token files in this tag folder
    index.mock.ts                   # (--includeMocks) re-exports all mock files in this tag
    {operation-id}.token.ts         # one file per endpoint
    {operation-id}.mock.ts          # (--includeMocks) typed mock provider per endpoint
```

Tags map to subfolders; untagged operations go into `default/`.

---

## Mock providers (`--includeMocks`)

Pass `--includeMocks` to co-generate a typed `provide{Operation}Mock()` wrapper
alongside every `.token.ts` file. This requires
[`@constantant/openapi-resource-mocks`](https://www.npmjs.com/package/@constantant/openapi-resource-mocks)
to be installed:

```bash
npm install -D @constantant/openapi-resource-mocks

npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL \
  --includeMocks
```

### Generated mock file

Each `.mock.ts` file exports a single `provide{Operation}Mock(initialBehavior?)` function.
`initialBehavior` is fully typed against the operation's response type — no hand-written interfaces:

```typescript
// pet/find-pets-by-status.mock.ts  (generated)
import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from './find-pets-by-status.token';
import type { FindPetsByStatusResponse } from './find-pets-by-status.token';

export function provideFindPetsByStatusMock(
  initialBehavior?: ProviderInitialBehavior<FindPetsByStatusResponse>,
): FactoryProvider {
  return provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS', initialBehavior);
}
```

The token name string key is always in sync — renaming an operation in the spec and
regenerating updates both the token constant and its key automatically.

### Usage in app.config.mock.ts

```typescript
// Before — hand-written key strings, no type safety on seed data
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from '@myapp/petstore-data-access';

provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS', {
  value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }],
  delay: 500,
})

// After — generated wrapper, fully typed initialBehavior
import { provideFindPetsByStatusMock } from '@myapp/petstore-data-access';

provideFindPetsByStatusMock({
  value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }],
  delay: 500,
})
```

`initialBehavior` supports:

| Shape | Effect |
|-------|--------|
| `{ value: T }` | Resolves immediately |
| `{ value: T, delay: ms }` | Loading for `ms` ms, then resolves |
| `{ loading: true }` | Stays loading indefinitely |
| `{ error: unknown }` | Fails immediately |
| `{ error: unknown, delay: ms }` | Loading for `ms` ms, then fails |

### Barrel imports

All mock providers for a tag are re-exported from `{tag}/index.mock.ts`; the root
`index.mock.ts` re-exports all tag barrels. The generator automatically registers a
`/mock` subpath alias in `tsconfig.base.json` alongside the main path alias, so you
can import from the mock barrel directly:

```typescript
import {
  provideFindPetsByStatusMock,
  provideAddPetMock,
} from '@myapp/petstore-data-access/mock';
```

The registered alias looks like:

```json
"@myapp/petstore-data-access/mock": ["libs/petstore-data-access/src/index.mock.ts"]
```

Mock providers are intentionally kept out of the main `index.ts` barrel so they
are never accidentally bundled into a production build.

### Stale cleanup

Re-running the generator without `--includeMocks` deletes any `.mock.ts` files from
the previous run. Removing an endpoint from the spec also removes its `.mock.ts`.

---

## Generated token anatomy

### GET with query params

For GET endpoints with query params, the reactive lambda uses a **block-body form** so it can
return `undefined` to suppress the request when a thunk returns `undefined`.

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

Why block-body? `httpResource(() => ({ url }))` always returns an object → always fires.
`httpResource(() => { ...; return undefined; })` → resource stays idle when `undefined` is returned.

### GET with path params

Path params (`/repos/{owner}/{repo}`) become required positional arguments on
the returned function and are interpolated into the URL template:

```typescript
export const REPOS_GET = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<ReposGetResponse>>
>('REPOS_GET');
```

### GET with header params

`in: header` parameters (e.g. `X-Api-Version`, `Accept-Language`) become named
string arguments on the returned function, placed after path params but before
query params. Required header params are required args; optional ones get `?`:

```typescript
export const LIST_REPORTS = new InjectionToken<
  (xApiVersion: string, acceptLanguage?: string, params?: ListReportsParams)
    => ReturnType<typeof httpResource<ListReportsResponse>>
>('LIST_REPORTS');
```

Inside the resource, they are merged into the `headers` object. Required params
are set directly; optional ones use a conditional spread so no header is sent
when the value is `undefined`:

```typescript
headers: {
  'X-Api-Version': xApiVersion,
  ...(acceptLanguage != null ? { 'Accept-Language': acceptLanguage } : {}),
},
```

### Mutation (POST/PUT/PATCH/DELETE)

The factory returns `(body: BodyType | Signal<BodyType>) => httpResource(...)`.
The resource config receives `method: 'POST'` (etc.) and `body` automatically.

#### JSON body

The common case. Pass a plain object or a signal — `HttpClient` serialises it automatically:

```typescript
const addPet = inject(ADD_PET);

readonly newPet = signal<AddPetBody>({ name: 'Rex', status: 'available' });
readonly result = addPet(this.newPet); // re-posts whenever newPet() changes
```

#### `multipart/form-data` body

The generated `${pascal}Body` type is derived from the OpenAPI schema, which
describes the *shape* of the form fields. At runtime the actual value must be a
`FormData` object — Angular's `HttpClient` does not encode plain objects as
multipart. Cast is required at the call site:

```typescript
// Generated (example from Petstore's POST /pet/{petId}/uploadImage):
//
//   export type UploadFileBody =
//     NonNullable<paths['/pet/{petId}/uploadImage']['post']['requestBody']>
//       ['content']['multipart/form-data'];
//                    // → { additionalMetadata?: string; file?: Blob }
//
//   export const UPLOAD_FILE = new InjectionToken<
//     (petId: string, body: UploadFileBody | Signal<UploadFileBody>)
//       => ReturnType<typeof httpResource<UploadFileResponse>>
//   >('UPLOAD_FILE');

@Component({ ... })
export class UploadComponent {
  private uploadFile = inject(UPLOAD_FILE);

  readonly selectedFile = signal<File | null>(null);
  readonly notes = signal('');

  // Build FormData reactively; cast to the spec type so the token accepts it.
  // FormData is the required runtime representation for multipart/form-data —
  // the spec type only describes the field names and shapes, not the encoding.
  private readonly formData = computed(() => {
    const file = this.selectedFile();
    if (!file) return null;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('additionalMetadata', this.notes());
    return fd as unknown as UploadFileBody;
  });

  readonly upload = this.uploadFile(
    '42',                    // petId (path param)
    () => this.formData(),   // thunk: resource stays idle when formData() is null
  );
}
```

> **Why the cast?** The OpenAPI schema types `multipart/form-data` bodies as a
> plain object (e.g. `{ file?: Blob; additionalMetadata?: string }`). This is
> accurate for type-checking field names and shapes, but `HttpClient` requires
> an actual `FormData` instance for multipart encoding. The `as unknown as
> UploadFileBody` cast bridges that gap without losing the field-name safety you
> get from the spec type.

#### `application/x-www-form-urlencoded` body

Pass a plain object. Angular's `HttpClient` URL-encodes it automatically — no
`URLSearchParams` wrapping needed:

```typescript
const submitForm = inject(SUBMIT_FORM);
readonly result = submitForm({ username: 'alice', password: 's3cr3t' });
```

### Security schemes

The generator emits one file per security scheme. Two patterns are used depending on the
scheme kind.

#### Signal-based schemes

`bearer`, `oauth2`, `openIdConnect`, `basic`, `apiKey-header`, `apiKey-query` — emit
`InjectionToken<Signal<string | null>>`. Endpoint tokens inject these optionally and merge
auth into the request as headers or query params. Reading the signal inside the `httpResource`
lambda creates a reactive dependency — the request re-fires automatically when the token value
changes:

```typescript
// oauth2.security-token.ts
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

| Kind | Auth mechanism |
|------|---------------|
| `bearer` / `oauth2` / `openIdConnect` | `Authorization: Bearer <token>` |
| `basic` | `Authorization: Basic <token>` |
| `apiKey-header` | Custom header (e.g. `X-API-Key: <token>`) |
| `apiKey-query` | Query param (e.g. `?apiKey=<token>`) |

Wire up in `app.config.ts`:

```typescript
export const MY_API_KEY = new InjectionToken<WritableSignal<string | null>>(
  'MY_API_KEY', { providedIn: 'root', factory: () => signal(null) }
);

{ provide: OAUTH2, useFactory: () => inject(MY_API_KEY) }
```

#### Interceptor-based schemes

`digest` — HTTP Digest is a challenge-response protocol: the Authorization header value
depends on the request URL, method, and a server-issued nonce, so it cannot be computed
as a static signal value. The generator emits `InjectionToken<HttpInterceptorFn>` plus a
**named, host-scoped interceptor wrapper**:

```typescript
// digest-auth.security-token.ts (generated for MYAPI_BASE_URL)
import { InjectionToken, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MYAPI_BASE_URL } from './api-base-url.token';

export const DIGEST_AUTH = new InjectionToken<HttpInterceptorFn>('DIGEST_AUTH');

export const myapiDigestAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const base = inject(MYAPI_BASE_URL);
  if (!req.url.startsWith(base)) return next(req); // scoped to this API only
  const fn = inject(DIGEST_AUTH, { optional: true });
  if (!fn) return next(req);
  return fn(req, next);
};
```

The interceptor name is derived from the base URL token name (`MYAPI_BASE_URL` → `myapi`)
and the scheme name. This makes it unique per API — if two APIs both use Digest, they emit
distinct interceptors with distinct host guards and never interfere with each other.

The consumer's implementation receives the full `HttpRequest`, which carries
`req.urlWithParams`, `req.method`, and `req.body` — everything needed to compute the
RFC 7616 hash with no reconstruction:

```typescript
import { myapiDigestAuthInterceptor, DIGEST_AUTH } from '@angular-openapi-gen/myapi-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([myapiDigestAuthInterceptor])
    ),
    { provide: DIGEST_AUTH, useValue: myDigestInterceptorFn },
  ],
};
```

Digest endpoint tokens do not inject the `DIGEST_AUTH` token directly — auth is applied
transparently by the interceptor at the HTTP layer.

---

## Declarative re-generation with the executor

Instead of remembering the full `nx g` command, declare a `generate` target in
your lib's `project.json` using the bundled executor:

```json
{
  "name": "petstore-data-access",
  "targets": {
    "generate": {
      "executor": "@constantant/openapi-resource-gen:generate",
      "options": {
        "specPath": "https://petstore3.swagger.io/api/v3/openapi.yaml",
        "outputDir": "libs/petstore-data-access/src",
        "baseUrlToken": "PETSTORE_BASE_URL",
        "includeMocks": true
      }
    }
  }
}
```

Then regenerate any time with:

```bash
npx nx run petstore-data-access:generate
```

The executor accepts the same options as the generator.

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

### Conditional requests (thunk returning undefined)

The `params` argument accepts either a plain object or a **thunk**
`() => ParamsType | undefined`. When a thunk returns `undefined`, the resource
stays idle (no HTTP request). When it returns a value, the resource fires and
re-fires on any signal change inside the thunk:

```typescript
// No request fires until both conditions are met
readonly results = this.youtubeSearch(() =>
  this.apiKey() && this.query()
    ? { q: this.query(), key: this.apiKey()! }
    : undefined
);
```

---

## Exported types

Every token file exports `Params`, `Body`, and `Response` type aliases so
consumers can derive domain types without duplicating type expressions:

```typescript
import type { FindPetsByStatusParams } from '@angular-openapi-gen/petstore-data-access';

type PetStatus = FindPetsByStatusParams['status']; // 'available' | 'pending' | 'sold'
```

---

## Sharing a resource across components

Each call to the injected factory function creates an **independent `httpResource` instance**.
Two components that both call `this.findPetsByStatus(...)` will fire two separate HTTP requests.

This is intentional — resources are reactive computations tied to a component's lifetime, and
`httpResource` does not have a built-in shared cache. For data that should be fetched once and
shared, hoist the resource call to a root-scoped service:

```typescript
// pets.store.ts  (not generated — write this yourself)
@Service()  // Angular 22 shorthand for @Injectable({ providedIn: 'root' })
export class PetsStore {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly status = signal<'available' | 'pending' | 'sold'>('available');

  // One httpResource instance, shared across any component that injects PetsStore
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }));
}
```

```typescript
// Component A and Component B both inject the same PetsStore singleton —
// only one HTTP request fires.
@Component({ ... })
export class PetsPageComponent {
  readonly store = inject(PetsStore);
}
```

For per-route isolation, create the resource inside a route-level provider instead:

```typescript
// In the route definition
{
  path: 'pets',
  component: PetsShellComponent,
  providers: [PetsStore, provideFindPetsByStatus()],
}
```

This scopes the resource to the route's injector — a new instance is created on
navigation in and destroyed on navigation out, with no cross-route state leakage.

---

## Adding a new data-access lib

1. Run the generator (pass a URL directly — no curl step needed):
   ```bash
   npx nx g @constantant/openapi-resource-gen:api-resource \
     --specPath=https://example.com/openapi.yaml \
     --outputDir=libs/myapi-data-access/src \
     --baseUrlToken=MYAPI_BASE_URL
   ```

2. Add a path alias to `tsconfig.base.json`:
   ```json
   "@angular-openapi-gen/myapi-data-access": ["libs/myapi-data-access/src/index.ts"]
   ```
   If you used `--includeMocks`, the generator adds the `/mock` subpath alias automatically. If you added the main alias manually, add the mock alias too:
   ```json
   "@angular-openapi-gen/myapi-data-access/mock": ["libs/myapi-data-access/src/index.mock.ts"]
   ```

3. Add base URL provider and token providers to `app.config.ts`.

4. Optionally, add a `generate` target to your lib's `project.json` (see the executor section above) so future regeneration is just `nx run myapi-data-access:generate`.

---

## Implementation notes

| Step | Tool | Purpose |
|------|------|---------|
| Spec loading | `js-yaml` + custom `stripNonSchemaRefs()` | Handle YAML and remove non-spec `$ref` links (markdown, images) that would break parsing |
| Type generation | `openapi-typescript` programmatic API | Emit `schema.d.ts` — the single source of truth for all request/response types |
| Spec dereferencing | `@apidevtools/swagger-parser` | Resolve all `$ref` chains for endpoint extraction |
| Security parsing | `parseSecuritySchemes(api)` | Extract scheme definitions; resolve per-operation overrides |
| Code generation | `renderTokenFile()` / `renderSecurityTokenFile()` / `renderMockFile()` | Direct string assembly for token and mock files |
| Formatting | `@nx/devkit` `formatFiles()` | Runs Prettier over all written files |

Hyphenated path parameter names (e.g. `{enterprise-team}` in the GitHub spec)
and dotted operationIds (e.g. `youtube.search.list`) are converted to camelCase /
PascalCase via `toCamelCase()` / `toPascalCase()` to produce valid JavaScript identifiers.

---

## Contributing

This package is developed in the [`angular-openapi-gen`](https://github.com/constantant/angular-openapi-gen)
Nx workspace. Issues and pull requests are welcome — see
[CONTRIBUTING.md](https://github.com/constantant/angular-openapi-gen/blob/master/CONTRIBUTING.md).

## License

[MIT](https://github.com/constantant/angular-openapi-gen/blob/master/LICENSE)
