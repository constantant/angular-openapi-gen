## 1.10.0 (2026-07-21)

### 🚀 Features

- **openapi-resource-gen:** add validateResponses option for runtime response validation ([24037a7](https://github.com/constantant/angular-openapi-gen/commit/24037a7))

### 🏡 Chore

- bump the minor-and-patch group across 1 directory with 37 updates ([#43](https://github.com/constantant/angular-openapi-gen/pull/43))
- bump js-yaml from 4.2.0 to 5.2.0 ([#33](https://github.com/constantant/angular-openapi-gen/pull/33))

### ❤️ Thank You

- Claude Sonnet 5
- kk
- Konstantin

## 1.9.1 (2026-06-23)

### 🩹 Fixes

- **openapi-resource-gen:** emit httpResource.text/blob for non-JSON responses ([a335333](https://github.com/constantant/angular-openapi-gen/commit/a335333))
- **openapi-resource-gen:** guard schema undefined and cast ArraySchemaObject for TS strict checks ([a475240](https://github.com/constantant/angular-openapi-gen/commit/a475240))

### 📖 Documentation

- **openapi-resource-gen:** document non-JSON response handling (text/blob) ([2166744](https://github.com/constantant/angular-openapi-gen/commit/2166744))
- update READMEs for v1.9.0 ([f74473f](https://github.com/constantant/angular-openapi-gen/commit/f74473f))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.9.0 (2026-06-19)

### 🚀 Features

- **openapi-resource-gen:** emit MSW 2.x handler files with includeMswHandlers option ([035141a](https://github.com/constantant/angular-openapi-gen/commit/035141a))
- **openapi-resource-gen:** handle OAS 3.1 constructs in parsing layer ([87314bb](https://github.com/constantant/angular-openapi-gen/commit/87314bb))
- **openapi-resource-gen:** emit enum label/description maps from x-enum-varnames / x-enum-descriptions ([bc5dec6](https://github.com/constantant/angular-openapi-gen/commit/bc5dec6))
- **openapi-resource-gen:** add readonlyResponses option to wrap XxxResponse/XxxError in Readonly<> ([72d69f9](https://github.com/constantant/angular-openapi-gen/commit/72d69f9))
- **openapi-resource-gen:** emit XxxRevived type and reviveXxxDates() for date/datetime fields ([3d268a7](https://github.com/constantant/angular-openapi-gen/commit/3d268a7))
- **openapi-resource-gen:** generate webhook token files for OAS 3.1 webhooks ([463f52c](https://github.com/constantant/angular-openapi-gen/commit/463f52c))
- **openapi-resource-gen:** emit discriminated union types for oneOf/anyOf with discriminator ([bc1b2f4](https://github.com/constantant/angular-openapi-gen/commit/bc1b2f4))
- **openapi-resource-gen:** emit _serializeParams for non-default query param styles ([dc9bc1e](https://github.com/constantant/angular-openapi-gen/commit/dc9bc1e))
- **openapi-resource-gen:** emit typed XxxError type aliases for 4xx/5xx JSON responses ([db820c3](https://github.com/constantant/angular-openapi-gen/commit/db820c3))

### 🩹 Fixes

- deduplicate toCamelCase and guard importJson item shape ([083f0f7](https://github.com/constantant/angular-openapi-gen/commit/083f0f7))

### 📖 Documentation

- update READMEs for v1.8.0/v0.5.0/v0.7.0 features ([c09f0a8](https://github.com/constantant/angular-openapi-gen/commit/c09f0a8))
- **openapi-resource-gen:** update generated mock file example for options? param ([959c2fc](https://github.com/constantant/angular-openapi-gen/commit/959c2fc))

### 🏡 Chore

- **openapi-resource-gen:** sync executor schema with generator (verbose, dateType) ([4376b6b](https://github.com/constantant/angular-openapi-gen/commit/4376b6b))

### 🧱 Updated Dependencies

- Updated openapi-resource-mocks to 1.9.0

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.8.0 (2026-06-14)

### 🚀 Features

- **openapi-resource-mocks:** reload status, event fixes, clearHistory, requestCount, keyDiscriminator ([6adfd13](https://github.com/constantant/angular-openapi-gen/commit/6adfd13))

### 🧱 Updated Dependencies

- Updated openapi-resource-mocks to 0.5.0

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.7.0 (2026-06-13)

### 🚀 Features

- **openapi-resource-gen:** deprecated JSDoc, response unions, binary body, cookie params, verbose flag ([fde6863](https://github.com/constantant/angular-openapi-gen/commit/fde6863))

### 🩹 Fixes

- **openapi-resource-gen:** delete orphaned tag index.ts barrels on stale cleanup ([7d3b2c3](https://github.com/constantant/angular-openapi-gen/commit/7d3b2c3))

### 📖 Documentation

- document new generator features and stale-cleanup fix ([e992bb3](https://github.com/constantant/angular-openapi-gen/commit/e992bb3))

### 🧱 Updated Dependencies

- Updated openapi-resource-mocks to 0.4.0

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.6.0 (2026-06-10)

### 🚀 Features

- **openapi-resource-gen:** phase 2 spec-aware mocks — specId + MockResourceMeta in generated files ([1b11b01](https://github.com/constantant/angular-openapi-gen/commit/1b11b01))

### 📖 Documentation

- align all docs with spec-aware mocks (phases 2-4) ([e7c4374](https://github.com/constantant/angular-openapi-gen/commit/e7c4374))

### 🧱 Updated Dependencies

- Updated openapi-resource-mocks to 0.3.0

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.5.0 (2026-06-09)

### 🚀 Features

- **openapi-resource-gen:** add includeMocks to executor schema ([7f2052d](https://github.com/constantant/angular-openapi-gen/commit/7f2052d))
- **openapi-resource-gen:** add includeMocks option to co-generate .mock.ts files ([8ebddd4](https://github.com/constantant/angular-openapi-gen/commit/8ebddd4))

### 🩹 Fixes

- **openapi-resource-gen:** auto-register /mock path alias and fix app.config.mock.ts imports ([c65e6a6](https://github.com/constantant/angular-openapi-gen/commit/c65e6a6))

### 📖 Documentation

- **openapi-resource-gen:** document includeMocks option ([99aaf8b](https://github.com/constantant/angular-openapi-gen/commit/99aaf8b))

### 🧱 Updated Dependencies

- Updated openapi-resource-mocks to 0.2.0

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.4.0 (2026-06-08)

### 📖 Documentation

- **openapi-resource-gen:** document caching boundary and multipart/form-data mutation pattern ([88211a4](https://github.com/constantant/angular-openapi-gen/commit/88211a4))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.3.2 (2026-06-08)

### 🩹 Fixes

- **openapi-resource-gen:** track api-base-url.token.ts in writtenFiles to prevent stale cleanup deletion ([4b63f2c](https://github.com/constantant/angular-openapi-gen/commit/4b63f2c))
- **openapi-resource-gen:** pass file URL to openapiTS for v7 compat ([27baeab](https://github.com/constantant/angular-openapi-gen/commit/27baeab))
- **openapi-resource-gen:** handle openapi-typescript v7 export shape change ([d5fb642](https://github.com/constantant/angular-openapi-gen/commit/d5fb642))

### 🏡 Chore

- bump openapi-typescript from 6.7.6 to 7.13.0 ([89926d0](https://github.com/constantant/angular-openapi-gen/commit/89926d0))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.3.1 (2026-06-07)

### 🩹 Fixes

- **openapi-resource-gen:** bump tsconfig target/lib to ES2022 ([30db4f0](https://github.com/constantant/angular-openapi-gen/commit/30db4f0))
- **openapi-resource-gen:** resolve lint errors in generator source ([f89f4b2](https://github.com/constantant/angular-openapi-gen/commit/f89f4b2))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.3.0 (2026-06-07)

### 🚀 Features

- **openapi-resource-gen:** tier 2 community-readiness improvements ([990d850](https://github.com/constantant/angular-openapi-gen/commit/990d850))
- **openapi-resource-gen:** tier 1 community-readiness improvements ([a344f50](https://github.com/constantant/angular-openapi-gen/commit/a344f50))

### 📖 Documentation

- align docs with Tier 1 & 2 generator changes ([a30f2fc](https://github.com/constantant/angular-openapi-gen/commit/a30f2fc))
- document public repo governance and branch protection ([d7bd84e](https://github.com/constantant/angular-openapi-gen/commit/d7bd84e))

### ❤️ Thank You

- Claude Opus 4.8
- Claude Sonnet 4.6
- kk

## 1.2.0 (2026-06-07)

### 🚀 Features

- **generator:** add Digest auth security scheme support ([a31e1b9](https://github.com/constantant/angular-openapi-gen/commit/a31e1b9))

### 📖 Documentation

- document Digest auth security scheme support ([5265b0a](https://github.com/constantant/angular-openapi-gen/commit/5265b0a))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.1.4 (2026-06-07)

### 🚀 Features

- **api-explorer:** add YouTube page with reactive auth token ([adba6b2](https://github.com/constantant/angular-openapi-gen/commit/adba6b2))
- **generator:** make security tokens reactive via Signal<string | null> ([52484e7](https://github.com/constantant/angular-openapi-gen/commit/52484e7))
- **youtube:** add youtube-data-access lib and fix dotted operationId support ([64ef851](https://github.com/constantant/angular-openapi-gen/commit/64ef851))
- **generator:** add security scheme support ([b3c7629](https://github.com/constantant/angular-openapi-gen/commit/b3c7629))

### 🩹 Fixes

- **generator:** suppress httpResource when params thunk returns undefined ([8cb9782](https://github.com/constantant/angular-openapi-gen/commit/8cb9782))
- **generator:** remove redundant non-null assertions in security headers ([5ffe9bb](https://github.com/constantant/angular-openapi-gen/commit/5ffe9bb))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.1.3 (2026-06-06)

This was a version bump only for openapi-resource-gen to align it with other projects, there were no code changes.

## 1.1.2 (2026-06-06)

### 🩹 Fixes

- include CHANGELOG.md in dist package assets ([38f6045](https://github.com/constantant/angular-openapi-gen/commit/38f6045))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.1.1 (2026-06-06)

### 🩹 Fixes

- deduplicate path params when defined at both path-item and operation level ([0bbd737](https://github.com/constantant/angular-openapi-gen/commit/0bbd737))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 1.1.0 (2026-06-06)

### 🚀 Features

- **libs:** generate travel-data-access and stripe-data-access libs ([78249de](https://github.com/constantant/angular-openapi-gen/commit/78249de))
- **openapi-resource-gen:** make generator publishable as npm package ([641452d](https://github.com/constantant/angular-openapi-gen/commit/641452d))
- **generator:** add providedIn option, default 'none' ([3076aa1](https://github.com/constantant/angular-openapi-gen/commit/3076aa1))
- **generator:** export param/body/response types; fix hyphenated path params ([ceee049](https://github.com/constantant/angular-openapi-gen/commit/ceee049))
- **api-resource:** support function-based params in findPetsByStatus and query handling ([4fd00d4](https://github.com/constantant/angular-openapi-gen/commit/4fd00d4))
- implement openapi-resource-gen and wire up api-explorer demo app ([6e048ad](https://github.com/constantant/angular-openapi-gen/commit/6e048ad))

### 🩹 Fixes

- **generator:** add types node to tsconfig for CI build ([e76aad7](https://github.com/constantant/angular-openapi-gen/commit/e76aad7))
- **generator-test:** mock openapi-typescript/dist/index.cjs instead of esm entry ([7f8ff8c](https://github.com/constantant/angular-openapi-gen/commit/7f8ff8c))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk