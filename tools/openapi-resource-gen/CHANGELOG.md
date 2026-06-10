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