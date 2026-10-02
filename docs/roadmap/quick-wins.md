# Roadmap: high-impact quick wins

_Written 2026-10-02 after a competitive review of Angular/OpenAPI tooling. This is a plan, not a
commitment: every item lists what to verify first and what "done" means._

**Status (2026-10-02):** #1–#4 shipped in `openapi-resource-gen` 1.14.0 / `openapi-resource-mocks`
1.13.0 (PRs #80–#83); the temp-file leak under _Housekeeping_ is fixed (#84). #5 is partly done:
README comparison, migration guides and the bundle-size benchmark are in (#85, #86); the runnable
demo, directory listings and the follow-up article remain. The benchmark showed that the default
`httpResource` flavour is not the smallest bundle (most of its cost is Angular's own
`httpResource`), see [`docs/benchmarks/bundle-size.md`](../benchmarks/bundle-size.md).

## Why these five

A review of the competing tools, their issue trackers and download numbers (details in the
[appendix](#appendix-evidence)) pointed to one conclusion:

- The niche is open. The Angular-specific incumbent, **ng-openapi-gen** (≈211K downloads/week),
  has declined `httpResource` support — its maintainer closed
  [PR #361](https://github.com/cyclosproject/ng-openapi-gen/pull/361) with _"I'm having less and
  less time to maintain this project, and httpResource isn't in scope."_ Orval, Hey API and the
  official OpenAPI Generator (PR #24964, still open) are all adding `httpResource`, so it stops
  being a differentiator on its own.
- Our weakness is **reach and prerequisites**, not the core idea: ≈150 downloads/week per package,
  4 GitHub stars, and a hard requirement for **Angular 22 and Nx 22**, while competitors target
  Angular 19.2/20+.
- The gaps users actually ask for are small, well-defined, and mostly cheap for us: per-call
  options, `readOnly`/`writeOnly`, Swagger 2.0 input, and proof of a lower Angular floor.

| #   | Quick win                                                            | Effort     | Release impact      | Depends on         |
| --- | -------------------------------------------------------------------- | ---------- | ------------------- | ------------------ |
| 1   | ✅ Verify and lower the Angular / Nx compatibility floor (#80)        | M          | minor (peer ranges) | —                  |
| 2   | ✅ Per-call request options (`HttpContext`, headers, …) (#83)         | M–L        | minor               | #1 (CI matrix)     |
| 3   | ✅ `readOnly` / `writeOnly` via `readWriteMarkers` (#81)              | S–M        | minor, opt-in       | —                  |
| 4   | ✅ Swagger 2.0 input (auto-upgrade) (#82)                             | S–M        | minor               | —                  |
| 5   | 🟡 Distribution and positioning (docs and benchmark done)             | M, ongoing | none (docs)         | #1 (honest claims) |

Suggested order: **#1 first** (it unblocks the audience and gives a CI matrix that validates the
others), **#3 and #4 in parallel** (small, independent), then **#2** (largest), with **#5**
running alongside from the moment #1 lands.

---

## 1. Verify and lower the Angular / Nx compatibility floor

**Goal.** Replace "Angular 22 + Nx 22" with the real floor, proven in CI, and publish a
compatibility table.

**Evidence.**

- Today we declare `@angular/common` / `@angular/core` `>=22.0.0` (mocks), `nx` / `@nx/devkit`
  `>=22.0.0` (gen), and the README/tutorials say "Angular 22+, Nx 22+".
- Competitors: OpenAPI Generator's `withHttpResource` requires Angular 20+; Orval and
  `@metaengine/openapi-angular` list 19.2+; `ng-openapi`'s plugin lists 19.2+.
- A rough check of the published type declarations (2026-10-02) shows everything our generated
  tokens use is **already declared in `@angular/common` 19.2.0**: `httpResource`,
  `httpResource.text/.blob/.arrayBuffer`, `HttpResourceRequest.reportProgress`, the `progress`
  signal, `HttpResourceOptions.defaultValue`. `withXhr` does **not** exist before 22.
  These were text counts on `.d.ts` files, not compile tests — which is why the first step below is
  a real matrix.

**Current state to keep in mind.**

- Generated code imports: `InjectionToken`, `inject`, `Signal`, `FactoryProvider` (core);
  `httpResource`, `HttpClient`, `HttpEventType`, `HttpEvent` (common/http); `rxjs`;
  optionally `@cfworker/json-schema`.
- Upload progress needs an XHR-backed `HttpClient`; under the `fetch` backend only `Sent` and
  `Response` events appear. Which versions default to `fetch` still has to be established.

**Approach.**

1. **Spike (½–1 day).** In a scratch workspace per Angular version (19.2, 20, 21, 22), install
   the matching `@angular/*`, copy the regenerated `petstore`, `weather` and `youtube` libs, and:
   - `tsc --noEmit` under strict settings (the repo already has a scratch `tsconfig` pattern);
   - run the wire-level tests in `apps/api-explorer/src/app/generated-query-params.spec.ts`
     (they use a real `HttpClient` plus `HttpTestingController`);
   - run the mocks package tests (they need `@angular/compiler` JIT, already set up in
     `tools/openapi-resource-mocks/vitest.setup.ts`).
     Record, per version: compiles? tests pass? which features degrade (e.g. `reportProgress`,
     `defaultValue`)?
2. **Fix or gate.** Either adjust generator output so it compiles everywhere, or document a
   per-feature minimum (for example "upload progress: Angular ≥ X").
3. **Nx floor.** Repeat for the generator itself against Nx 20.x / 21.x / 22.x (it uses
   `Tree`, `formatFiles`, `updateJson`, `joinPathFragments`, and `FsTree`/`flushChanges` from
   `nx/src/generators/tree`, an internal path).
4. **CI.** Add a compatibility job (separate workflow, e.g. `compat.yml`, triggered on PRs that
   touch `tools/` or `libs/`, plus nightly). Keep it fast: install per-version into a cached
   scratch dir, run tsc + the wire tests.
5. **Ship.** Widen `peerDependencies` to the proven range, add a compatibility table to the
   README and tutorials ("Prerequisites"), and correct the DEV article.

**Done when.** A matrix is green in CI for every version we claim; peer ranges match it; docs
state the floor and any per-feature minimums.

**Risks.** Type-level differences in `HttpResourceRef`/overloads between versions; `zoneless` vs
zone defaults in older versions affecting the tests; the internal `nx/src/generators/tree` import
changing across Nx versions.

---

## 2. Per-call request options

**Goal.** Let callers pass `HttpContext`, headers, `withCredentials` and the `httpResource`
options (`defaultValue`, `debugName`, `injector`, `equal`) per call, without leaving the generated
token.

**Evidence.**

- Orval exposes `headers`, `context`, a raw `request` escape hatch and `defaultValue` /
  `debugName` / `injector` / `equal` for `httpResource`.
- `openapi-ng` markets "thin, pass-through helpers" that forward every `HttpClient.request` /
  `httpResource` option unchanged.
- `ng-openapi-gen` [#160](https://github.com/cyclosproject/ng-openapi-gen/issues/160) asked for
  `HttpContext`.
- Real uses: skip-auth / retry / caching flags read by interceptors via `HttpContext`; a
  `defaultValue` so lists render empty instead of `undefined` while loading; `debugName` for
  Angular DevTools; `injector` when called outside an injection context.

**Current state.** Tokens build a fixed request config. The only extension points are the generated
arguments (path/header/cookie params, body, `params`) and the security tokens.

**Approach.**

1. **Signature.** Add a trailing, optional `options?: XxxOptions` argument (after `params`).
   Because it is always last and optional, it is non-breaking and the existing "required arguments
   first" ordering in `buildFnArgs` already handles it.
2. **Types** in a generated `request-options.ts` at the lib root, exported from the root barrel:
   - httpResource flavour: `defaultValue?: T`, `equal?`, `injector?`, `debugName?` plus request
     fields `context?`, `withCredentials?`, `headers?`, `keepalive?`, `cache?`, `credentials?`,
     `priority?`, `mode?`, `redirect?`.
   - httpClient flavour: `context?`, `withCredentials?`, `headers?`, and the options that exist on
     the verified Angular floor (see #1).
   - Do **not** expose `parse` (it is used by `--validateResponses`); optionally compose it.
3. **Precedence.** Decide and document one rule for headers: generated headers (spec header
   params, cookies, auth) first, then `options.headers` merged last. Open question below.
4. **Plumb** inside the reactive lambda for `httpResource` and into `http.request(...)` options for
   `httpClient`; only add keys the caller set.
5. **Opt-in first.** Gate behind `--callOptions` for the first release; flip the default in a later
   major. Keeps current output byte-identical for existing users.
6. **Mocks.** `provideMockResource` / `provideMockObservable` forward all arguments to the bus,
   and the content script drops events whose arguments cannot be structured-cloned (an `Injector`
   or `HttpContext` would trigger that). Sanitize a trailing options object to a placeholder in
   `MockResourceBus.sanitizeArg`, and teach the DevTools history view to label it "Options".

**Tests.** Wire-level (real `HttpClient`): an interceptor sees the `HttpContext`; `withCredentials`
reaches the request; `defaultValue` is returned while loading; header precedence. Generator tests
for both clients. A mocks test for the sanitized argument.

**Done when.** Both clients accept the options, current output is unchanged without the flag, mock
mode and DevTools history still work, and the README documents the option and its precedence.

**Risks.** API surface creep; Angular versions that lack some request fields (drive from #1);
ordering interplay with the existing `params` / `body` rules.

---

## 3. `readOnly` / `writeOnly` via `readWriteMarkers`

**Goal.** Request types stop requiring server-generated fields (`id`, timestamps) and responses stop
exposing write-only ones (`password`).

**Evidence.**

- Requested across the ecosystem: Hey API
  [#28](https://github.com/hey-api/openapi-ts/issues/28), openapi-typescript
  [#604](https://github.com/drwpow/openapi-typescript/issues/604); Orval strips `readOnly` from
  request bodies by default.
- We build on `openapi-typescript` 7.13.0, which supports `readWriteMarkers`, but our call
  (`generator.ts`, `_openapiTS(tmpCleanUrl)`) passes no options.

**Verified on a toy spec (2026-10-02).** With `readWriteMarkers: true` the generated `schema.d.ts`
gains the helpers `$Read<T>`, `$Write<T>`, `Readable<T>` and `Writable<T>`, and the schema becomes
`id: $Read<number>; name: string; password: $Write<string>`. Without it, the type is plain.

**Approach.**

1. New generator option `--readWriteMarkers` (default `false`; revisit the default later). When on,
   call `openapiTS(src, { readWriteMarkers: true })`.
2. Wrap token aliases: `XxxBody = Writable<…requestBody…>`, `XxxResponse = Readable<…responses…>`
   (and `XxxError`). Keep `params` types untouched.
3. Make the derived types consistent: the discriminated-union helpers and the date `Revived` aliases
   are built from `XxxResponse` and `components['schemas'][…]`, so the latter need `Readable<>` too.
4. **Measure.** Conditional deep types can slow `tsc` on huge specs. Compare `tsc` time and memory
   before/after on `github` (≈30 MB of definitions) and `youtube`; if it hurts, apply the wrapper
   at the top level only.

**Tests.** Generator tests for the emitted aliases; a compile test on a synthetic spec (a request
without `id` compiles, a response without `password` has no such key); regenerate the four demo
libs and confirm no change when the flag is off.

**Done when.** Opt-in flag works on the demo libs, type-check time is acceptable on the large specs,
and the README explains the behaviour.

**Risks.** Compile-time cost on large specs; unions/intersections interacting with
`Readable`/`Writable`.

---

## 4. Swagger 2.0 input

**Goal.** Accept Swagger 2.0 specs by upgrading them in-process, instead of failing.

**Evidence.**

- Today `generator.ts` throws _"For Swagger 2.x specs, convert first with swagger2openapi."_ Hey API
  and OpenAPI Generator accept 2.0; many real APIs still publish it.
- Converter candidates (npm, 2026-10-02): `@scalar/openapi-upgrader` 0.4.1 (published 2026-09-29,
  ≈4.9M downloads/week) is actively maintained; `swagger2openapi` 7.0.8 is widely used (≈5M/week)
  but was last published in 2022.

**Spike result (2026-10-02).** `upgrade(swagger2Doc, '3.0')` from `@scalar/openapi-upgrader`
produced OpenAPI 3.0.4, derived `servers` from `host`/`basePath`/`schemes`, moved `definitions` to
`components.schemas`, and mapped response `schema` to `content.application/json`; path and query
parameters were preserved.

**Approach.**

1. In the parse pipeline (step 3, the version check), detect `swagger: '2.x'`, upgrade to 3.0 in
   process, print a one-line notice, then continue as normal. Keep the error for Swagger 1.x.
2. Dependency check: the generator is CommonJS and several deps are ESM-only. Verify the upgrader
   loads (a `require()` of an ES module works on Node ≥ 22.12; otherwise use a dynamic `import()`
   shim, as is already done for `openapi-typescript`).
3. Handle what converters get wrong: `formData` parameters → multipart/urlencoded bodies,
   `collectionFormat` → `style`/`explode`, `consumes`/`produces` per operation,
   `securityDefinitions` → `components.securitySchemes`, external `$ref`s.
4. Optional escape hatch `--convertSwagger2=false` to keep the old failure.

**Tests.** Fixture specs (a small 2.0 doc plus the classic petstore v2), end to end: generate, then
`tsc`; assert the emitted token for a `formData` upload and a `collectionFormat` array query param.

**Done when.** A 2.0 spec generates and compiles; docs list the supported versions.

**Risks.** Converter quirks on messy real-world specs; a new dependency to keep current.

---

## 5. Distribution and positioning

**Goal.** Make the project findable and its trade-offs obvious to the people who are leaving
ng-openapi-gen or evaluating Orval / Hey API.

**Evidence.**

- ≈142 (gen) and ≈157 (mocks) downloads/week, 4 stars; the launch article on DEV has zero
  comments; the closest Angular-first tools are similarly tiny (`ng-openapi` ≈3.7K, `openapi-ng` ≈21).
- The ng-openapi-gen decision above creates a window; OpenAPI Generator's
  [#21263](https://github.com/OpenAPITools/openapi-generator/issues/21263) shows people asking for
  exactly this and finding no established tool.

**Deliverables.**

1. **README restructure:** a 60-second quickstart at the top, an honest comparison table (including
   where Orval or Hey API are the better choice), and the verified compatibility table from #1.
2. **Migration guides** in `docs/`: _from ng-openapi-gen_ and _from Orval_ — side-by-side
   "service method → injected token" examples, and how options map.
3. **A reproducible bundle-size benchmark:** import one endpoint from the 76-endpoint YouTube spec
   with each tool and report the production bundle. This is the strongest, checkable claim for the
   one-file-per-endpoint design; publish the script alongside the numbers.
4. **A runnable demo** (StackBlitz or similar). Note that the Nx requirement is the main audience
   limiter — see the open question on a standalone CLI.
5. **Listings and metadata:** submit to openapi.tools, tune npm descriptions and keywords, GitHub
   topics and the social preview.
6. **Content and channels:** a follow-up article built on the benchmark; share in r/angular,
   Angular community channels, and relevant issue threads — only where it genuinely helps, and
   disclosing authorship.

**Metrics.** Weekly downloads, stars, issues and questions from people outside the project, and
traffic to the migration guides. Review monthly.

---

## Housekeeping found during the review

- **Temp-file leak in tests (fixed in #84).** Every run of `nx test openapi-resource-gen` leaves an empty
  `_tmp_oas_download_<timestamp>.yaml` in the repo root (27 had accumulated; one more appeared on a
  single run). They are gitignored, but the URL-download path should clean up after itself, and
  tests should not write to the workspace root. Reproduce, fix, and add an assertion that nothing is
  left behind. Size: XS.

## Open questions

1. **Nx-only.** The generator is an Nx plugin, which excludes plain Angular CLI projects — likely
   the biggest limit on adoption (Hey API, `ng-openapi` and `openapi-ng` all ship standalone CLIs).
   Is a thin standalone CLI wrapper (using `FsTree` rooted at the working directory) in scope? It is
   not part of this plan but would change the priority of #5.
2. **Floor target.** Aim for Angular 20+ (what OpenAPI Generator requires) or 19.2+ (what Orval
   lists)? Let the spike in #1 decide.
3. **Defaults.** Ship #2 and #3 opt-in and flip later, or default-on from the start?
4. **Header precedence** in #2: should a caller be able to override a generated `Authorization`
   header?

## Out of scope here (candidates for later)

Request-body validation and Zod output; generated Faker data factories (Hey API has a Faker
plugin); Nx inferred tasks and an `update-spec` command; a TanStack Query adapter or a small
cache/invalidation layer (`httpResource` deliberately has no shared cache, deduplication or
mutation lifecycle); Signal Forms validators generated from schema constraints; OpenAPI 3.2
server-sent events; a DevTools "record a real response as a mock" mode.

---

## Appendix: evidence

Weekly npm downloads and GitHub activity were read on 2026-10-02; download counts are noisy
(CI inflates them). A few details came from search summaries rather than a direct read of the page.

| Tool                        | Weekly downloads | Angular `httpResource`                                                                            | Notable                                                                                                |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| openapi-typescript          | 9.5M             | n/a                                                                                               | the type engine we build on                                                                            |
| Hey API `openapi-ts`        | 6.1M             | yes (class output has an `inject()` bug, [#4435](https://github.com/hey-api/hey-api/issues/4435)) | Faker, MSW, Playwright and validator plugins                                                           |
| Orval                       | 2.8M             | `httpClient`, `httpResource` or both                                                              | MSW + Faker, Zod incl. request bodies                                                                  |
| OpenAPI Generator           | 1.7M             | [PR #24964](https://github.com/OpenAPITools/openapi-generator/pull/24964) open, GET only          | top issues are schema correctness                                                                      |
| swagger-typescript-api      | 647K             | no                                                                                                |                                                                                                        |
| ng-openapi-gen              | 211K             | declined ([PR #361](https://github.com/cyclosproject/ng-openapi-gen/pull/361))                    | open [#114](https://github.com/cyclosproject/ng-openapi-gen/issues/114) for `reportProgress`/`observe` |
| TanStack Angular Query      | 105K             | alternative data layer                                                                            |                                                                                                        |
| ng-openapi                  | 3.7K             | plugin, GET only                                                                                  | Zod plugin                                                                                             |
| @metaengine/openapi-angular | 368              | yes                                                                                               |                                                                                                        |
| openapi-ng (AVSystem)       | 21               | `.observable()` / `.resource()` / `.request()` per operation                                      | Rust engine, Signal Forms validator                                                                    |
| **ours**                    | 142 / 157        | yes                                                                                               | MSW, DevTools panel, testing helpers                                                                   |

Sources: [Orval Angular guide](https://orval.dev/docs/guides/angular/),
[Orval #2316](https://github.com/orval-labs/orval/issues/2316),
[Hey API Faker plugin](https://heyapi.dev/docs/openapi/typescript/plugins/faker),
[Hey API MSW plugin](https://heyapi.dev/openapi-ts/plugins/msw),
[openapi-ng](https://github.com/AVSystem/openapi-ng),
[ng-openapi](https://github.com/ng-openapi/ng-openapi),
[@nx-plugin-openapi](https://github.com/berger-engineering-io/nx-plugin-openapi),
[openapi-typescript CLI](https://openapi-ts.dev/cli),
[TanStack Query vs `httpResource`](https://dev.to/dhutaryan/tanstack-query-style-caching-the-angular-native-way-4igc).
