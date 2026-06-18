# 1 — Setup: generate a data-access lib

In this guide you'll install the generator, point it at the Petstore OpenAPI spec, and walk
through every file it produces so nothing is a mystery when you start customising for your
own API.

---

## Prerequisites

- Angular 22+ project inside an Nx 22+ workspace
- `provideHttpClient()` registered somewhere in your providers

---

## Step 1 — install the generator

```bash
npm install -D @constantant/openapi-resource-gen
```

The package ships both the Nx generator and the `generate` executor (for repeatable
regeneration without remembering the full command).

---

## Step 2 — run the generator

Pass a local file path or any `https://` URL — no `curl` pre-step needed:

```bash
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL \
  --includeMocks \
  --specId=petstore
```

> `--includeMocks` emits a typed `provide{Operation}Mock()` wrapper alongside every token.
> `--specId` is the identifier the Chrome DevTools panel uses to match mocks to spec entries.
> Both are optional but recommended if you plan to use the mock tools.

---

## Step 3 — what was generated

```
libs/petstore-data-access/src/
  schema.d.ts                          ← openapi-typescript output; never edit this
  api-base-url.token.ts                ← InjectionToken<string> for the base URL
  index.ts                             ← barrel: re-exports everything below
  index.mock.ts                        ← barrel: re-exports all mock providers
  mocks.manifest.json                  ← lightweight metadata for the DevTools panel

  pet/
    index.ts
    index.mock.ts
    find-pets-by-status.token.ts       ← one file per endpoint
    find-pets-by-status.mock.ts        ← one mock provider per endpoint
    add-pet.token.ts
    add-pet.mock.ts
    ...

  store/
    ...

  user/
    ...
```

### One token file, one endpoint

Open `pet/find-pets-by-status.token.ts`:

```typescript
import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

// All types come from the generated schema — zero hand-written interfaces
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
          return { url: `${base}/pet/findByStatus`, params: _params as any };
        });
    },
  };
}
```

Key things to notice:
- **One file per endpoint** — esbuild tree-shakes at the file boundary, so any token you never
  `inject()` is never imported and costs zero bytes in your bundle.
- **Block-body reactive lambda** — the lambda can return `undefined` to keep the resource idle.
  A shorthand `() => ({ url })` would always return an object and always fire.
- **Types from `schema.d.ts`** — no hand-written interfaces, no risk of type drift.

---

## Step 4 — register a path alias

The generator adds a path alias to `tsconfig.base.json` automatically if the outputDir is
inside the workspace. If it didn't (e.g. you scaffolded the lib yourself), add it:

```jsonc
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@myapp/petstore-data-access": ["libs/petstore-data-access/src/index.ts"],
      "@myapp/petstore-data-access/mock": ["libs/petstore-data-access/src/index.mock.ts"]
    }
  }
}
```

---

## Step 5 — wire up providers

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  PETSTORE_BASE_URL,
  provideFindPetsByStatus,
  provideAddPet,
} from '@myapp/petstore-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    provideFindPetsByStatus(),
    provideAddPet(),
    // only add providers for tokens you actually use — everything else is tree-shaken away
  ],
};
```

---

## Step 6 — keep the lib in sync with your spec

Re-run the generator whenever your spec changes:

```bash
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL \
  --includeMocks \
  --specId=petstore
```

Or declare a `generate` target in `libs/petstore-data-access/project.json` so the command
becomes `nx run petstore-data-access:generate`:

```json
{
  "targets": {
    "generate": {
      "executor": "@constantant/openapi-resource-gen:generate",
      "options": {
        "specPath": "https://petstore3.swagger.io/api/v3/openapi.yaml",
        "outputDir": "libs/petstore-data-access/src",
        "baseUrlToken": "PETSTORE_BASE_URL",
        "includeMocks": true,
        "specId": "petstore"
      }
    }
  }
}
```

The generator tracks stale files and deletes any `.token.ts` or `.mock.ts` file that no
longer corresponds to an endpoint in the spec — no phantom exports accumulate.

---

## Generator option reference

| Option | Default | Description |
|--------|---------|-------------|
| `specPath` | required | Local path or `https://` URL to an OpenAPI 3.x YAML or JSON spec |
| `outputDir` | required | Output directory relative to workspace root |
| `baseUrlToken` | `API_BASE_URL` | Name of the base-URL `InjectionToken` |
| `tagFilter` | all tags | Comma-separated tags to include (others are skipped) |
| `namingConvention` | `kebab` | `kebab` → `find-pets-by-status.token.ts`; `camel` → `findPetsByStatus.token.ts` |
| `providedIn` | `none` | `none` (use `provideX()` helpers) or `root` (self-registering) |
| `includeMocks` | `false` | Emit `.mock.ts` files and `mocks.manifest.json` |
| `includeMswHandlers` | `false` | Emit `.msw.ts` MSW 2.x handler files |
| `specId` | derived from `baseUrlToken` | Identifier embedded in `MockResourceMeta`; must match when importing into the DevTools panel |
| `verbose` | `false` | Print a `+`/`~`/`-` summary of created, updated, and deleted files |

---

## Next

[Guide 2 — Consuming tokens in components →](./02-consuming.md)
