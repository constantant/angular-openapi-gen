# openapi-resource-gen — StackBlitz example

A NestJS API and an Angular 22 app in one Nx workspace. The API's OpenAPI spec is generated from its
decorators, and [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen)
turns that spec into one tree-shakeable `InjectionToken` per endpoint, which the Angular app consumes.

```
apps/api  ──export-openapi──▶  specs/api.openapi.json  ──generate──▶  libs/tasks-data-access  ──▶  apps/web
 (NestJS + @nestjs/swagger)                                            (generated, do not edit)    (httpResource)
```

On StackBlitz, `npm start` runs the whole chain (Nx itself can't start in a browser sandbox, so the
scripts call `tsc` and the package's `openapi-resource-gen` CLI directly). Locally you can also use
Nx: `nx serve web` runs the same chain and `npx nx graph` shows it.

## Try it

1. Open `apps/api/src/app/tasks/tasks.controller.ts` and add an endpoint, for example
   `@Get('count')` with `@ApiOkResponse({ type: Number })`.
2. Run `npm run generate`. The spec is re-exported, then a new token file appears in
   `libs/tasks-data-access/src/tasks/`.
3. Inject the new token in `apps/web/src/app/app.ts` and `provideXxx()` it in `app.config.ts`.

## Commands

| Command                | What it does                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `npm start`            | Generate, then API on :3000 and web on :4200 (proxies `/api` to API)  |
| `npm run export-openapi` | Build the API and write `specs/api.openapi.json`                    |
| `npm run generate`     | Export the spec, then regenerate `libs/tasks-data-access`             |

With Nx installed locally: `npx nx run tasks-data-access:generate`, `npx nx run-many -t serve -p api web`.

Swagger UI is at `/docs` on the API port (3000).

The web app also serves the spec at `/api.openapi.json` (from `specs/`), so you can import that URL into the
[OpenAPI Resource Mocks DevTools extension](https://github.com/constantant/angular-openapi-gen) (Specs tab).
