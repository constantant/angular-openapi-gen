# Listings and metadata (roadmap #5)

Copy-ready text for the places that make the project findable. Anything marked **manual** needs the
maintainer's account.

## npm

`description`, `keywords`, `homepage` and `bugs` live in each package's `package.json`
(`tools/openapi-resource-gen`, `tools/openapi-resource-mocks`). npm shows what the **last published**
version says, so the new metadata appears with the next release.

## GitHub repository (manual, or `gh repo edit`)

```bash
gh repo edit constantant/angular-openapi-gen \
  --description "Generate tree-shakeable, signal-native Angular API clients from OpenAPI 3.x / Swagger 2.0: one InjectionToken per endpoint via httpResource" \
  --homepage "https://github.com/constantant/angular-openapi-gen#readme" \
  --add-topic angular --add-topic angular-signals --add-topic nx --add-topic nx-plugin \
  --add-topic openapi --add-topic openapi3 --add-topic swagger --add-topic api-client \
  --add-topic code-generator --add-topic httpresource --add-topic typescript --add-topic msw
```

Existing topics: `angular`, `angular-signals`, `nx`, `nx-generators`, `openapi`, `rest-api`.
GitHub allows up to 20.

**Social preview (manual):** Settings, General, Social preview, 1280×640 px. Suggested content: the
package name, the tagline below, and a two-line code sample (`inject(FIND_PETS_BY_STATUS)(...)`).

## openapi.tools (manual)

[openapi.tools](https://openapi.tools) is community-maintained from the
[OpenAPI-Tools/openapi.tools](https://github.com/OpenAPI-Tools/openapi.tools) repository: add one entry
under `data/tools/` by pull request. Check that repository's current `CONTRIBUTING` for the exact
file format first; suggested field values:

| Field       | Value                                                                                                                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | openapi-resource-gen                                                                                                                                                                                                                    |
| Description | Nx generator that turns an OpenAPI 3.x or Swagger 2.0 spec into a tree-shakeable Angular client: one `InjectionToken` per endpoint, backed by `httpResource` or `HttpClient`. Includes mocks, MSW handlers and a Chrome DevTools panel. |
| Category    | Code generators (TypeScript / Angular)                                                                                                                                                                                                  |
| Language    | TypeScript                                                                                                                                                                                                                              |
| Link        | https://github.com/constantant/angular-openapi-gen                                                                                                                                                                                      |
| License     | MIT                                                                                                                                                                                                                                     |

## One-line tagline (README, article, social preview)

> Tree-shakeable, signal-native Angular API clients from OpenAPI: one `InjectionToken` per endpoint.

## Other places worth a listing

- [Nx community plugins](https://nx.dev/plugin-registry): add the package to the registry (their
  contribution docs describe the PR).
- The `openapi-typescript` ecosystem page, as a tool built on it.
- Angular community resources lists, only where a project of this kind is welcome.

Disclose authorship whenever posting about the project.
