## 0.3.0 (2026-06-10)

### 🚀 Features

- **mocks:** phase 1 spec-aware mocks — MockResourceMeta through the stack ([e3a9520](https://github.com/constantant/angular-openapi-gen/commit/e3a9520))
- **openapi-resource-mocks:** persistent catch-mode watch list and timing fixes ([1d63b36](https://github.com/constantant/angular-openapi-gen/commit/1d63b36))
- **devtools-panel:** add history tab, catch mode, and CSS token migration ([d4151bc](https://github.com/constantant/angular-openapi-gen/commit/d4151bc))

### 🩹 Fixes

- **openapi-resource-mocks:** re-fire _notifyRequest when reactive thunk args change ([708a71e](https://github.com/constantant/angular-openapi-gen/commit/708a71e))

### 📖 Documentation

- align all docs with spec-aware mocks (phases 2-4) ([e7c4374](https://github.com/constantant/angular-openapi-gen/commit/e7c4374))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 0.2.0 (2026-06-09)

### 🚀 Features

- **openapi-resource-gen:** add includeMocks option to co-generate .mock.ts files ([8ebddd4](https://github.com/constantant/angular-openapi-gen/commit/8ebddd4))
- **openapi-resource-mocks:** expose openApiMock(key) window shorthand via MockResourceBus ([32cd5b5](https://github.com/constantant/angular-openapi-gen/commit/32cd5b5))
- **openapi-resource-mocks:** resolve reactive lambda args in _notifyRequest ([bf5c9af](https://github.com/constantant/angular-openapi-gen/commit/bf5c9af))
- **openapi-resource-mocks:** add optional delay to provideMockResource initial behavior ([e829d1e](https://github.com/constantant/angular-openapi-gen/commit/e829d1e))
- **openapi-resource-mocks:** export TokenValue utility type for typed mock seed data ([fafe3f3](https://github.com/constantant/angular-openapi-gen/commit/fafe3f3))

### 🩹 Fixes

- **openapi-resource-gen:** auto-register /mock path alias and fix app.config.mock.ts imports ([c65e6a6](https://github.com/constantant/angular-openapi-gen/commit/c65e6a6))

### 💅 Refactors

- **openapi-resource-mocks:** create mock ref per call in provideMockResource ([5b9c9d7](https://github.com/constantant/angular-openapi-gen/commit/5b9c9d7))
- **openapi-resource-mocks:** accept DeepPartial seed data in provideMockResource ([245c109](https://github.com/constantant/angular-openapi-gen/commit/245c109))

### 📖 Documentation

- **openapi-resource-mocks:** document Playwright E2E setup and mock control patterns ([aa638ca](https://github.com/constantant/angular-openapi-gen/commit/aa638ca))
- **openapi-resource-mocks:** align README with per-call ref creation ([2e50dc3](https://github.com/constantant/angular-openapi-gen/commit/2e50dc3))

### 🏡 Chore

- **openapi-resource-mocks:** remove stale Changelog heading left by initial setup ([281ae62](https://github.com/constantant/angular-openapi-gen/commit/281ae62))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 0.1.1 (2026-06-08)

### 🩹 Fixes

- **openapi-resource-mocks:** add comment to empty destroy() to satisfy no-empty-function lint rule ([868fb39](https://github.com/constantant/angular-openapi-gen/commit/868fb39))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

