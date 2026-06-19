## 1.9.0 (2026-06-19)

### 🚀 Features

- **openapi-resource-mocks/testing:** add response sequence mocking ([abef482](https://github.com/constantant/angular-openapi-gen/commit/abef482))
- **openapi-resource-mocks:** add /testing entry point with mockResource helper ([afedfa6](https://github.com/constantant/angular-openapi-gen/commit/afedfa6))
- **devtools-panel:** create unregistered (local) mocks from the panel ([f79d39f](https://github.com/constantant/angular-openapi-gen/commit/f79d39f))

### 🩹 Fixes

- **openapi-resource-mocks:** catch mode no longer disrupts existing mock value on enable ([5b869c1](https://github.com/constantant/angular-openapi-gen/commit/5b869c1))
- **openapi-resource-mocks:** emit reloading event and fix reload control routing ([78000c8](https://github.com/constantant/angular-openapi-gen/commit/78000c8))

### 📖 Documentation

- update READMEs for v1.8.0/v0.5.0/v0.7.0 features ([c09f0a8](https://github.com/constantant/angular-openapi-gen/commit/c09f0a8))
- **openapi-resource-mocks:** document reload, requestCount, clearHistory, keyDiscriminator ([7d61ea9](https://github.com/constantant/angular-openapi-gen/commit/7d61ea9))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 0.5.0 (2026-06-14)

### 🚀 Features

- **openapi-resource-mocks:** reload status, event fixes, clearHistory, requestCount, keyDiscriminator ([6adfd13](https://github.com/constantant/angular-openapi-gen/commit/6adfd13))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

## 0.4.0 (2026-06-13)

### 🩹 Fixes

- **openapi-resource-mocks:** sanitize FormData/File/Blob args before DOM dispatch ([7609660](https://github.com/constantant/angular-openapi-gen/commit/7609660))

### 📖 Documentation

- fix badge coverage and stale version numbers ([290ea7f](https://github.com/constantant/angular-openapi-gen/commit/290ea7f))

### ❤️ Thank You

- Claude Sonnet 4.6
- kk

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

