# openapi-resource-gen — StackBlitz example

A NestJS API and an Angular 22 app in one Nx workspace. The API's OpenAPI spec is generated from its
decorators, and [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen)
turns that spec into one tree-shakeable `InjectionToken` per endpoint, which the Angular app consumes.

```
apps/api  ──export-openapi──▶  specs/api.openapi.json  ──generate──▶  libs/tasks-data-access  ──▶  apps/web
 (NestJS + @nestjs/swagger)                                            (generated, do not edit)    (httpResource)
```

`nx serve web` runs the whole chain. Open the project graph with `npx nx graph`.

## Try it

1. Open `apps/api/src/app/tasks/tasks.controller.ts` and add an endpoint, for example
   `@Get('count')` with `@ApiOkResponse({ type: Number })`.
2. Run `npx nx run tasks-data-access:generate`. The spec is re-exported, then a new token file
   appears in `libs/tasks-data-access/src/tasks/`.
3. Inject the new token in `apps/web/src/app/app.ts` and `provideXxx()` it in `app.config.ts`.

## Commands

| Command                                  | What it does                                            |
| ---------------------------------------- | ------------------------------------------------------- |
| `npx nx run api:export-openapi`          | Build the API and write `specs/api.openapi.json`        |
| `npx nx run tasks-data-access:generate`  | Export the spec, then regenerate the data-access lib    |
| `npx nx run-many -t serve -p api web`    | API on :3000, web on :4200 (proxies `/api` to the API) |

Swagger UI is at `/docs` on the API port (3000).
