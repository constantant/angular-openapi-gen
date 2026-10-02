# Compatibility matrix

Proves the version ranges we declare. Each run builds a **throwaway workspace** with one exact
Angular (or Nx) version, installs it, copies in the code under test and runs it — it does not install
this repository, so it behaves the same locally and in CI.

```bash
npm run compat -- --list
npm run compat -- angular 21      # libs + mocks on Angular 21.x
npm run compat -- angular 20-min  # Angular 20.0.0, the declared floor
npm run compat -- nx 22           # the generator on Nx 22.x
npm run compat -- angular 20 --keep   # leave the workspace behind to debug it
```

| Target          | Runs                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angular <key>` | strict `tsc` over every `libs/*-data-access` lib (generated mock files included) and `tools/openapi-resource-mocks`; then Vitest: the mocks specs, every `apps/api-explorer/src/app/generated-*.spec.ts` wire-level spec (a real `HttpClient` with a fake backend), and `templates/angular/extra.spec.ts` (`reportProgress`, the `validateResponses` parse hook) |
| `nx <key>`      | the generator's own suite plus `templates/nx/e2e.spec.ts`: the real generator and parser through `FsTree` + Prettier on `specs/petstore.yaml`, and the executor's internal `nx/src/generators/tree` import                                                                                                                                            |

`matrix.json` defines the versions and must stay in sync with the job matrices in
`.github/workflows/compat.yml`. To support a new Angular or Nx major, add it to both. The workflow
runs on pull requests that touch the code under test, and weekly to catch new releases.

## Why the floor is Angular 20 / Nx 20

A spike (2026-10-02) found:

|                            | Generated libs                  | Mocks package                                           |
| -------------------------- | ------------------------------- | ------------------------------------------------------- |
| Angular 19.2               | compile, wire tests pass        | **16 type errors** — `ResourceStatus` is a numeric enum |
| Angular 20.0.0 → 22.x      | compile, tests pass             | compile, tests pass                                     |
| Nx 19.8 → 23.x (generator) | 156 tests pass on every version |                                                         |

Angular 19 is out of support, so 20 is the floor. Nx 19.8 also passed, but only versions in
`matrix.json` are claimed.
