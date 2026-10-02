# Migrating from ng-openapi-gen

[ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) generates one service class per tag
plus model classes, and its methods return `Observable`s. This project generates one injectable token
per endpoint whose function returns an `httpResource` (or, per endpoint, an `Observable`). This guide
maps the concepts and shows how to migrate gradually.

**Prerequisites:** Angular 20+ and Nx 20+ (see [Compatibility](../README.md#compatibility)). If your
workspace is not an Nx workspace, this generator is not an option yet.

## Concept map

| ng-openapi-gen | This project |
|---|---|
| `ng-openapi-gen.json` (`input`, `output`) | `--specPath`, `--outputDir` (a generator command or a `generate` target) |
| `ApiConfiguration.rootUrl` | The base-URL token, e.g. `PETSTORE_BASE_URL` (`--baseUrlToken`) |
| `PetService` (one class per tag) | One token per endpoint, in a folder per tag (`pet/find-pets-by-status.token.ts`) |
| `inject(PetService).findPetsByStatus(...)` | `inject(FIND_PETS_BY_STATUS)(...)` |
| Generated model classes | Types from `openapi-typescript`: `paths[...]`, plus `XxxResponse` / `XxxBody` / `XxxParams` aliases per endpoint |
| `Observable<T>` | A resource: `.value()`, `.isLoading()`, `.error()` signals. Use `--clientType=httpClient` for an `Observable<T>` instead |
| `$Response` variants (full `HttpResponse`) | `--reportProgress` events for uploads and blob downloads; otherwise use `httpClient` tokens with call options |
| HTTP interceptors | Unchanged. Both use Angular's `HttpClient` underneath |

## Step by step

1. **Install and generate next to your existing client.**

   ```bash
   npm install -D @constantant/openapi-resource-gen
   npx nx g @constantant/openapi-resource-gen:api-resource \
     --specPath=openapi.yaml \
     --outputDir=libs/api/src \
     --baseUrlToken=API_BASE_URL
   ```

   Both generated clients can live in the same app, so you can migrate one component at a time.

2. **Provide the base URL and the tokens you use** (tokens are opt-in, which is what makes unused
   endpoints free):

   ```typescript
   providers: [
     provideHttpClient(),
     { provide: API_BASE_URL, useValue: environment.apiUrl },
     provideFindPetsByStatus(),
   ];
   ```

3. **Replace calls, one component at a time.**

   ```typescript
   // before (ng-openapi-gen)
   private readonly petService = inject(PetService);
   pets$ = this.petService.findPetsByStatus({ status: 'available' });

   // after
   private readonly findPets = inject(FIND_PETS_BY_STATUS);
   readonly status = signal<'available' | 'pending' | 'sold'>('available');
   readonly pets = this.findPets(() => ({ status: this.status() }));
   // template: pets.value(), pets.isLoading(), pets.error()
   ```

   A function argument makes the request reactive: when `status` changes the resource re-fetches and
   cancels the stale request. Return `undefined` from it to keep the resource idle.

4. **Keep Observables where you want them.** Generate with `--clientType=httpClient`, or only for
   some endpoints with `--httpClientTags=...` / `--httpClientOperations=...`. Those tokens return
   `(args) => Observable<T>` and can be used with `rxResource` or `firstValueFrom`.

5. **Auth and headers.** Security schemes become signal tokens (`BEARER_AUTH` and friends) that
   endpoint code reads at request time. For one-off needs add `--callOptions` and pass
   `{ headers, context, withCredentials }` as a last argument.

6. **Delete the old client** when nothing imports it, and remove `ng-openapi-gen.json` and its
   npm script.

## Things that differ

- **Error handling.** A resource reports failures through `.error()` instead of an Observable error
  channel. With `httpClient` tokens you keep `catchError`.
- **Model classes.** There are none; types are structural. Code that used `instanceof` on models
  needs a type guard instead.
- **Date fields.** Opt in with `--dateType=Date` (or `Temporal`) to get revived date objects.
- **Regeneration.** Re-running the generator overwrites its output and deletes files for endpoints
  that no longer exist, so never edit generated files by hand.
