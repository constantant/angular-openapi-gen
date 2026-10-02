# Migrating from Orval

[Orval](https://orval.dev) can generate Angular clients as `HttpClient` calls, `httpResource` calls,
or both. This project is narrower: Angular only, one `InjectionToken` per endpoint, with mocks and a
DevTools panel built in. Choose it when per-endpoint tree-shaking and the testing tooling matter more
than Orval's broader feature set (see [how they compare](../README.md#how-it-compares)).

**Prerequisites:** Angular 20+ and Nx 20+. Orval runs standalone; this generator is an Nx plugin.

## Concept map

| Orval | This project |
|---|---|
| `orval.config.ts` (`input.target`, `output.target`) | `--specPath`, `--outputDir` |
| `output.client: 'angular'` | `--clientType=httpClient` |
| `httpResource` output | Default (`--clientType=httpResource`) |
| Mixed client per call | `--httpClientTags` / `--httpClientOperations` choose `HttpClient` per endpoint |
| `output.baseUrl` / mutator for the base URL | The base-URL token (`--baseUrlToken`), overridable per environment in DI |
| Custom mutator (headers, auth) | Interceptors for global concerns; `--callOptions` for per-call `headers`, `context`, `withCredentials`; signal security tokens for auth |
| `output.mode: 'tags-split'` | Always: one folder per tag, one file per endpoint |
| MSW handlers (`mock: true`) | `--includeMswHandlers` |
| Zod schemas | Not generated. Use `--validateResponses` for runtime checking of responses against the spec |
| Faker mock data | Not generated. Use the mock bus and `/testing` helpers with your own values, or the DevTools "Generate" button |

## Step by step

1. Install the generator and generate into a new lib (see the
   [setup guide](./01-setup.md)):

   ```bash
   npx nx g @constantant/openapi-resource-gen:api-resource \
     --specPath=openapi.yaml --outputDir=libs/api/src --baseUrlToken=API_BASE_URL \
     --includeMocks=true --specId=api
   ```

2. Replace imports gradually. Orval functions or service methods become tokens:

   ```typescript
   // before (Orval, httpResource client)
   readonly pets = getFindPetsByStatus(() => ({ status: this.status() }));

   // after
   private readonly findPets = inject(FIND_PETS_BY_STATUS);
   readonly pets = this.findPets(() => ({ status: this.status() }));
   ```

3. Provide each token you use (`provideFindPetsByStatus()`), or generate with `--providedIn=root`
   for self-registering singletons.

4. Move custom-mutator logic: base URL and global headers to DI and interceptors; per-call needs to
   `--callOptions`.

5. Replace test doubles. Component tests use `mockResource(TOKEN, ...)` from
   `@constantant/openapi-resource-mocks/testing`; end-to-end tests use the mock bus
   ([guide](./04-e2e-tests.md)) or generated MSW handlers.

6. Remove `orval.config.ts`, its npm script and the generated output once nothing imports it.

## What you give up

- Zod schema generation (including request bodies) and Faker data factories.
- A standalone CLI: the generator needs an Nx workspace.
- Non-Angular targets.
