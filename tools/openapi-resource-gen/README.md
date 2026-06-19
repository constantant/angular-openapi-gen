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
| `includeMocks` | no | `false` | Emit a `.mock.ts` per endpoint plus `index.mock.ts` barrels and a `mocks.manifest.json` — requires [`@constantant/openapi-resource-mocks`](https://www.npmjs.com/package/@constantant/openapi-resource-mocks) |
| `includeMswHandlers` | no | `false` | Emit a `.msw.ts` per endpoint plus `index.msw.ts` barrels — requires [`msw`](https://mswjs.io) >= 2.0.0 |
| `specId` | no | derived from `baseUrlToken` | Identifier embedded in every generated `MockResourceMeta` and in `mocks.manifest.json`. Defaults to `baseUrlToken` with `_BASE_URL` stripped and lowercased (e.g. `PETSTORE_BASE_URL` → `petstore`). Must match the value used when importing the spec into the DevTools panel. |
| `dateType` | no | `string` | `string` (default — no change), `Date`, or `Temporal`. When set to `Date` or `Temporal`, emits a typed `XxxRevived` alias and a `reviveXxxDates()` helper per endpoint whose response contains `format: date-time` or `format: date` fields. |
| `readonlyResponses` | no | `false` | Wrap all `XxxResponse` and `XxxError` type aliases in `Readonly<>` to prevent accidental mutation of response data. |
| `verbose` | no | `false` | Print a `+`/`~`/`-` summary of created, updated, and deleted files after generation. |

---

## Output structure

```
{outputDir}/
  schema.d.ts                       # openapi-typescript output, never edit manually
  api-base-url.token.ts             # InjectionToken<string> for the API root URL
  {scheme}.security-token.ts        # one per security scheme (if any)
  index.ts                          # re-exports all tag barrels + base-url + security tokens
  index.mock.ts                     # (--includeMocks) re-exports all tag mock barrels
  index.msw.ts                      # (--includeMswHandlers) re-exports all tag MSW handler arrays
  mocks.manifest.json               # (--includeMocks) machine-readable endpoint list + specId for the DevTools panel
  webhooks/
    {webhook-name}.webhook.ts       # (OAS 3.1 webhooks) InjectionToken<HttpInterceptorFn> per webhook
  {tag}/
    index.ts                        # re-exports all token files in this tag folder
    index.mock.ts                   # (--includeMocks) re-exports all mock files in this tag
    index.msw.ts                    # (--includeMswHandlers) re-exports all MSW handlers in this tag
    {operation-id}.token.ts         # one file per endpoint
    {operation-id}.mock.ts          # (--includeMocks) typed mock provider per endpoint
    {operation-id}.msw.ts           # (--includeMswHandlers) MSW 2.x handler factory + pre-called array
```

Tags map to subfolders; untagged operations go into `default/`. OAS 3.1 `webhooks` map to `webhooks/`.

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
import type { ProviderInitialBehavior, MockProviderOptions, MockResourceMeta } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from './find-pets-by-status.token';
import type { FindPetsByStatusResponse } from './find-pets-by-status.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'findPetsByStatus',
  path: '/pet/findByStatus',
  method: 'get',
  tag: 'pet',
};

export function provideFindPetsByStatusMock(
  initialBehavior?: ProviderInitialBehavior<FindPetsByStatusResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS', initialBehavior, _meta, options);
}
```

Each mock file also embeds a `MockResourceMeta` const with `specId`, `operationId`, `path`, `method`, and `tag`. The DevTools panel reads this metadata to pre-populate the Respond tab's schema display — no manual configuration needed.

The optional `options` argument (second param on the wrapper) is passed through to `provideMockResource`. The main use is `keyDiscriminator` — see [`@constantant/openapi-resource-mocks`](https://www.npmjs.com/package/@constantant/openapi-resource-mocks) for details.

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

// With keyDiscriminator for list-row components (second argument)
provideFindPetsByStatusMock(undefined, { keyDiscriminator: () => inject(PET_ID).toString() })
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

Re-running the generator cleans up any file it no longer produces. This includes:
- `.token.ts` / `.mock.ts` for removed endpoints
- `.security-token.ts` for removed security schemes
- `{tag}/index.ts` / `{tag}/index.mock.ts` barrel files when all endpoints for a tag are removed (e.g. after narrowing `--tagFilter`)
- `mocks.manifest.json` when `--includeMocks` is dropped

Stale tag folders (left empty after their barrels are removed) are also deleted.

---

## MSW handlers (`--includeMswHandlers`)

Pass `--includeMswHandlers` to co-generate [MSW 2.x](https://mswjs.io) handler files
alongside every `.token.ts`. Requires `msw >= 2.0.0`:

```bash
npm install -D msw

npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL \
  --includeMswHandlers
```

### Generated MSW file

Each `.msw.ts` file exports a handler factory and a pre-called array:

```typescript
// pet/find-pets-by-status.msw.ts  (generated)
import { http, HttpResponse } from 'msw';
import type { FindPetsByStatusResponse } from './find-pets-by-status.token';

export function findPetsByStatusHandler(body?: FindPetsByStatusResponse | null) {
  return http.get('/pet/findByStatus', () =>
    body !== undefined
      ? HttpResponse.json(body)
      : new HttpResponse(null, { status: 204 }),
  );
}

export const findPetsByStatusHandlers = [findPetsByStatusHandler()];
```

Path params (`{id}`) are converted to MSW `:id` syntax. DELETE and other no-response endpoints
emit `new HttpResponse(null, { status: 204 })` by default.

### Barrel imports

The generator registers a `/msw` path alias in `tsconfig.base.json` automatically:

```json
"@myapp/petstore-data-access/msw": ["libs/petstore-data-access/src/index.msw.ts"]
```

Use the pre-built arrays for a quick setup, or import the factory to override the response:

```typescript
import { findPetsByStatusHandlers } from '@myapp/petstore-data-access/msw';
import { findPetsByStatusHandler } from '@myapp/petstore-data-access/msw';

// In your MSW setup file:
server.use(...findPetsByStatusHandlers);

// Override with a specific response in a test:
server.use(findPetsByStatusHandler([{ id: 1, name: 'Rex', status: 'available' }]));
```

MSW handler files are intentionally kept out of the main `index.ts` barrel so they
are never bundled into a production build.

---

## Date revival (`--dateType`)

By default the generator uses `dateType: 'string'` — date/time fields stay as
`string` exactly as `openapi-typescript` emits them. Set `--dateType=Date` or
`--dateType=Temporal` to also generate a `XxxRevived` type alias and a
`reviveXxxDates()` helper for any endpoint whose response contains
`format: date-time` or `format: date` fields:

```typescript
// orders/get-order.token.ts  (generated with --dateType=Date)

// The raw response type still reflects the schema faithfully:
export type GetOrderResponse =
  paths['/orders/{id}']['get']['responses']['200']['content']['application/json'];

// Revived alias: date fields replaced with Date objects
export type GetOrderRevived = Omit<GetOrderResponse, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

// Pure reviver function — does not mutate the raw object
export function reviveGetOrderDates(raw: GetOrderResponse): GetOrderRevived {
  const obj = raw as unknown as Record<string, unknown>;
  return {
    ...obj,
    createdAt: obj['createdAt'] != null ? new Date(obj['createdAt'] as string) : obj['createdAt'],
    updatedAt: obj['updatedAt'] != null ? new Date(obj['updatedAt'] as string) : obj['updatedAt'],
  } as GetOrderRevived;
}
```

For array responses (`GetOrderRevived` becomes `(Omit<…> & { … })[]`), the function
maps over each element. Using `--dateType=Temporal` produces `Temporal.Instant` for
`date-time` fields and `Temporal.PlainDate` for `date` fields:

```typescript
export type GetOrderRevived = Omit<GetOrderResponse, 'createdAt'> & {
  createdAt: Temporal.Instant;
};
```

Call the reviver after receiving the resource value:

```typescript
readonly order = this.getOrder('42');
readonly orderRevived = computed(() => {
  const raw = this.order.value();
  return raw ? reviveGetOrderDates(raw) : undefined;
});
```

---

## Readonly responses (`--readonlyResponses`)

Pass `--readonlyResponses` to wrap every emitted `XxxResponse` and `XxxError` type
alias in `Readonly<>`. This prevents accidental mutation of the returned data at the
TypeScript type level:

```typescript
// Without --readonlyResponses (default):
export type GetOrderResponse =
  paths['/orders/{id}']['get']['responses']['200']['content']['application/json'];

// With --readonlyResponses:
export type GetOrderResponse =
  Readonly<paths['/orders/{id}']['get']['responses']['200']['content']['application/json']>;
```

Multi-status union aliases use `Readonly<>` on each branch:

```typescript
export type UpsertOrderResponse =
  | Readonly<paths['/orders']['put']['responses']['200']['content']['application/json']>
  | Readonly<paths['/orders']['put']['responses']['201']['content']['application/json']>;
```

`--readonlyResponses` works in combination with `--dateType` — the `XxxRevived`
alias also wraps the `Omit & { … }` shape in `Readonly<>`.

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

### GET with cookie params

`in: cookie` parameters become named string args placed after header params. Required
cookies are required args; optional ones get `?`. All cookies for the endpoint are
combined into a single `Cookie` header value at request time:

```typescript
export const GET_CURRENT_USER = new InjectionToken<
  (session: string, theme?: string) => ReturnType<typeof httpResource<GetCurrentUserResponse>>
>('GET_CURRENT_USER');
```

Inside the resource the cookie header is built as an array join, so absent optional
cookies are not included:

```typescript
headers: {
  Cookie: [`session=${session}`, ...(theme != null ? [`theme=${theme}`] : [])].join('; '),
},
```

> **Browser note:** The `Cookie` header is a [forbidden header name](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name) — browsers silently block it. Cookie params work correctly in Angular Universal / SSR (Node's `HttpClient` has no such restriction). For browser-only apps, set cookies via `document.cookie` before making the request and pass `withCredentials: true`.

### Deprecated operations

When the spec marks an operation with `deprecated: true`, the generator emits a
`/** @deprecated */` JSDoc comment immediately above the token constant:

```typescript
/** @deprecated */
export const OLD_ENDPOINT = new InjectionToken<...>('OLD_ENDPOINT');
```

TypeScript then surfaces the deprecation warning at every `inject(OLD_ENDPOINT)` call
site with no runtime cost.

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

#### Binary / octet-stream body

When the spec declares `application/octet-stream`, `image/*`, `application/pdf`, or
any other non-JSON/form/multipart content type, the generated body type is
`Blob | ArrayBuffer` rather than a `paths[...]` derivation:

```typescript
export type UploadBinaryBody = Blob | ArrayBuffer;

export const UPLOAD_BINARY = new InjectionToken<
  (body: UploadBinaryBody | Signal<UploadBinaryBody>)
    => ReturnType<typeof httpResource<UploadBinaryResponse>>
>('UPLOAD_BINARY');
```

Pass a `Blob`, `File`, or `ArrayBuffer` directly — `HttpClient` sends binary bodies
as-is without any encoding step.

### Response type unions

When an endpoint can return JSON on multiple 2xx status codes (e.g. `200` for an
update and `201` for a create), the generated `Response` type alias is a union:

```typescript
export type UpsertResourceResponse =
  | paths['/resources']['put']['responses']['200']['content']['application/json']
  | paths['/resources']['put']['responses']['201']['content']['application/json'];
```

The `httpResource<UpsertResourceResponse>` call site receives a value that is the
union of all possible success shapes.

### Typed error aliases

For 4xx/5xx responses that carry JSON bodies, the generator emits an `XxxError` type alias
alongside the response type. This lets callers type the `.error()` signal from `httpResource`:

```typescript
// Single error code
export type GetOrderError =
  paths['/orders/{id}']['get']['responses']['404']['content']['application/json'];

// Multiple error codes — union
export type GetOrderError =
  | paths['/orders/{id}']['get']['responses']['400']['content']['application/json']
  | paths['/orders/{id}']['get']['responses']['404']['content']['application/json'];
```

With `--readonlyResponses` each branch is wrapped in `Readonly<>`.

### Enum label/description maps

When query or path params use the vendor extensions `x-enum-varnames` and/or
`x-enum-descriptions`, the generator emits typed const objects alongside the
`Params` type alias. These are useful for building select options and accessible
tooltips without hand-writing display strings:

```typescript
// find-pets-by-status.token.ts
// Spec has: enum: [available, pending, sold], x-enum-varnames: [Available, Pending, Sold]
export const findPetsByStatusStatusLabels = {
  'available': 'Available',
  'pending': 'Pending',
  'sold': 'Sold',
} as const;

// x-enum-descriptions: [Pets ready to adopt, Pending adoption, Already adopted]
export const findPetsByStatusStatusDescriptions = {
  'available': 'Pets ready to adopt',
  'pending': 'Pending adoption',
  'sold': 'Already adopted',
} as const;
```

The object key is the raw enum value (as it appears in the API request); the object
value is the human-readable label or description from the extension.

### Non-default query param serialization

When a query parameter declares a non-default `style` in the spec (`deepObject`,
`pipeDelimited`, or `spaceDelimited`), the generator emits a module-private
`_serializeParams()` helper inside the token file. This helper converts the typed
`XxxParams` object to a flat `Record<string, string | readonly string[]>` before
passing it to `HttpClient`:

```typescript
// deep-search.token.ts (generated — deepObject param 'filter')
function _serializeParams(p: DeepSearchParams | undefined): Record<string, string | readonly string[]> | undefined {
  if (p == null) return undefined;
  const _out: Record<string, string | readonly string[]> = {};
  for (const [_k, _v] of Object.entries(p as Record<string, unknown>)) {
    if (_v == null) continue;
    switch (_k) {
      case 'filter':
        for (const [_dk, _dv] of Object.entries(_v as Record<string, unknown>))
          if (_dv != null) _out['filter[' + _dk + ']'] = String(_dv);
        break;
      default:
        _out[_k] = Array.isArray(_v) ? (_v as unknown[]).map(String) : String(_v as string | number | boolean);
    }
  }
  return _out;
}
```

| Spec `style` | Serialization |
|---|---|
| `deepObject` | `filter[key]=value` — one query param per nested key |
| `pipeDelimited` | `tags=a\|b\|c` — pipe-joined array |
| `spaceDelimited` | `tags=a b c` — space-joined array |

Standard comma-separated arrays use the default `HttpClient` serialization; no helper
is emitted for those.

### Discriminated unions

When a response schema uses `oneOf`/`anyOf` with a discriminator, the generator emits
narrowing helpers alongside the `XxxResponse` type:

```typescript
// get-animal.token.ts (discriminator: { propertyName: 'type' })
export type GetAnimalDiscriminatorKey = 'dog' | 'cat';

// Mapping-style: each variant intersects its component schema with the discriminant literal
export type GetAnimalDog = components['schemas']['Dog'] & { 'type': 'dog' };
export type GetAnimalCat = components['schemas']['Cat'] & { 'type': 'cat' };

// Convenience union of all narrowed variants
export type GetAnimalDiscriminated = GetAnimalDog | GetAnimalCat;
```

When the discriminator resolves from a plain enum (no `components/schemas` mapping),
the generator uses `Extract` instead:

```typescript
export type GetAnimalDog = Extract<GetAnimalResponse, { 'type': 'dog' }>;
```

For array responses (`GetAnimalResponse` is `Animal[]`), `GetAnimalDiscriminated`
becomes `(GetAnimalDog | GetAnimalCat)[]`.

Use the narrowed types at the call site:

```typescript
const item = this.getAnimal.value();
if (item && 'type' in item && item.type === 'dog') {
  const dog: GetAnimalDog = item; // narrowed
}
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

## OAS 3.1 support

The generator handles OpenAPI 3.1 specs in addition to 3.0.x. The main differences
that affect code generation:

### Type arrays and implicit nullability

OAS 3.1 allows `type: ['string', 'null']` instead of `nullable: true`. Both forms
produce the same output from `openapi-typescript` (`string | null`), so generated
token types remain correct in either spec version.

### Webhooks

OAS 3.1 `webhooks` entries are emitted as `.webhook.ts` files under a `webhooks/`
subfolder. Each webhook token holds `InjectionToken<HttpInterceptorFn>` — the
consumer registers an interceptor that handles incoming webhook requests:

```typescript
// webhooks/order-placed.webhook.ts  (generated)
import { InjectionToken } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import type { webhooks } from '../schema.d';

export type OrderPlacedWebhookPayload =
  NonNullable<webhooks['order.placed']['post']['requestBody']>['content']['application/json'];

export type OrderPlacedWebhookResponse =
  webhooks['order.placed']['post']['responses']['200']['content']['application/json'];

export const ORDER_PLACED_WEBHOOK = new InjectionToken<HttpInterceptorFn>('ORDER_PLACED_WEBHOOK');
```

Wire up in `app.config.ts`:

```typescript
import { ORDER_PLACED_WEBHOOK } from '@myapp/myapi-data-access';
import type { OrderPlacedWebhookPayload } from '@myapp/myapi-data-access';

const myWebhookHandler: HttpInterceptorFn = (req, next) => {
  // req.body is the incoming webhook payload
  const payload = req.body as OrderPlacedWebhookPayload;
  // ... handle it
  return next(req);
};

{ provide: ORDER_PLACED_WEBHOOK, useValue: myWebhookHandler }
```

Webhook files are included in the root `index.ts` barrel and participate in stale
file cleanup like all other generated files.

---

## Implementation notes

| Step | Tool | Purpose |
|------|------|---------|
| Spec loading | `js-yaml` + custom `stripNonSchemaRefs()` | Handle YAML and remove non-spec `$ref` links (markdown, images) that would break parsing |
| Type generation | `openapi-typescript` programmatic API | Emit `schema.d.ts` — the single source of truth for all request/response types |
| Spec dereferencing | `@apidevtools/swagger-parser` | Resolve all `$ref` chains for endpoint extraction |
| Security parsing | `parseSecuritySchemes(api)` | Extract scheme definitions; resolve per-operation overrides |
| Code generation | `renderTokenFile()` / `renderSecurityTokenFile()` / `renderMockFile()` / `renderMswFile()` | Direct string assembly for token, mock, and MSW handler files |
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
