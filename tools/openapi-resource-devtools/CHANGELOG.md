# Changelog

## 0.4.0 (2026-06-10)

### 🚀 Features

- **devtools-panel:** explore specs and catch endpoints from Specs tab ([b0be0d2](https://github.com/constantant/angular-openapi-gen/commit/b0be0d2d644ec1af08b7bae5af893bc8957bd1a7))
- **devtools-panel:** phase 4 spec-aware mocks — example generation + schema validation ([1a3a26d](https://github.com/constantant/angular-openapi-gen/commit/1a3a26dae18be9777da337d95df774d630e9a5ad))
- **devtools-panel:** phase 3 spec-aware mocks — SPEC_STORE, Specs tab, pre-population ([30537ac](https://github.com/constantant/angular-openapi-gen/commit/30537ac8d016b6df81f71e7b90fedf4c5f85bcd1))
- **mocks:** phase 1 spec-aware mocks — MockResourceMeta through the stack ([e3a9520](https://github.com/constantant/angular-openapi-gen/commit/e3a95201e7bf293df589e96c319127a4c58e7c1b))
- **openapi-resource-mocks:** persistent catch-mode watch list and timing fixes ([1d63b36](https://github.com/constantant/angular-openapi-gen/commit/1d63b36a57ffe6824052cdefcb32d72571c0b79e))

### 📖 Documentation

- align all docs with spec-aware mocks (phases 2-4) ([e7c4374](https://github.com/constantant/angular-openapi-gen/commit/e7c4374afd2e7757556f448b4ef40a38dd40c29b))
- add devtools extension, mocks package, and extension release to all docs ([108a577](https://github.com/constantant/angular-openapi-gen/commit/108a577fb51f3b979b1c2b7a47470e75e97c7645))

### 🔧 Refactoring

- **devtools-panel:** replace custom tab/header CSS with Angular Material components ([d1ef4d3](https://github.com/constantant/angular-openapi-gen/commit/d1ef4d349e10b31a6860b8449cbeeba54e4afc00))

## 0.3.2 (2026-06-09)

_No user-facing changes._

## 0.3.1 (2026-06-09)

### 🩹 Bug Fixes

- **devtools-panel:** guard chrome.devtools access — return stub bridge when not in DevTools context (fixes E2E) ([cd51564](https://github.com/constantant/angular-openapi-gen/commit/cd515647c838117a274f5ca5791a763f20af5bde))
- **devtools-panel:** replace empty-function stubs with vi.fn(); add noop comments to satisfy no-empty-function ([9d3bebd](https://github.com/constantant/angular-openapi-gen/commit/9d3bebdedf5be70baa7fe7942f6dfc5d3391b77b))
- **devtools-panel:** fix test suite — provide MOCK_BRIDGE mock and add chrome types to spec tsconfig ([57fe0c9](https://github.com/constantant/angular-openapi-gen/commit/57fe0c95578e13a237b0351a5d1a8548f523119f))
- **release-extension:** push tag explicitly — --follow-tags skips lightweight tags; switch to annotated ([ef52caa](https://github.com/constantant/angular-openapi-gen/commit/ef52caa67a8a2f0f2fe1394458b8962f75bc5266))

## 0.3.0 (2026-06-09)

### 🚀 Features

- **devtools-panel:** add history tab, catch mode, and CSS token migration ([d4151bc](https://github.com/constantant/angular-openapi-gen/commit/d4151bc04849c32983dfd1c559af2ccaf9c6e6f7))
- **devtools-panel:** replace Preact panel with Angular 22 + Material ([598cb2e](https://github.com/constantant/angular-openapi-gen/commit/598cb2e3efe60d151b216c31cd9b76a1a739cb0a))
- **openapi-resource-devtools:** scaffold P0 Chrome DevTools extension ([365474d](https://github.com/constantant/angular-openapi-gen/commit/365474d078f83b2c67f0f85944e928334c8f4ac3))

### 🩹 Bug Fixes

- **devtools-panel:** handle extension context invalidation and port disconnects ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2de055e9158e5a7490748102b8d4d7300f))
- **openapi-resource-devtools:** fix content-script isolation — use scripting.executeScript(world:MAIN) ([d5eaf06](https://github.com/constantant/angular-openapi-gen/commit/d5eaf06b3bd39648f6d3ecff86584b6a062cbdc2))

## 0.2.0 (2026-06-09)

### 🚀 Features

- **devtools-panel:** replace Preact panel with Angular 22 + Material ([598cb2e](https://github.com/constantant/angular-openapi-gen/commit/598cb2e3efe60d151b216c31cd9b76a1a739cb0a))
- **openapi-resource-devtools:** scaffold P0 Chrome DevTools extension ([365474d](https://github.com/constantant/angular-openapi-gen/commit/365474d078f83b2c67f0f85944e928334c8f4ac3))

### 🩹 Bug Fixes

- **devtools-panel:** handle extension context invalidation and port disconnects ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2de055e9158e5a7490748102b8d4d7300f))
- **openapi-resource-devtools:** fix content-script isolation — use scripting.executeScript(world:MAIN) ([d5eaf06](https://github.com/constantant/angular-openapi-gen/commit/d5eaf06b3bd39648f6d3ecff86584b6a062cbdc2))

## 0.1.0 (2026-06-09)

### 🚀 Features

- **devtools-panel:** initial Angular 22 + Angular Material DevTools panel ([598cb2e](https://github.com/constantant/angular-openapi-gen/commit/598cb2e))
- **devtools-panel:** add History tab — event timeline per mock ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2))
- **devtools-panel:** add Catch mode — intercept and hold requests before responding ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2))
- **devtools-panel:** migrate CSS to Angular Material M3 system tokens ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2))

### 🩹 Bug Fixes

- **devtools-panel:** handle extension context invalidation and port reconnects ([a68cea2](https://github.com/constantant/angular-openapi-gen/commit/a68cea2))
