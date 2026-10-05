# Design note: a standalone CLI (no Nx required)

_Status: proposal, 2026-10-02. Nothing here is built. It answers open question #1 of the
[quick-wins roadmap](../roadmap/quick-wins.md)._

## Problem

`openapi-resource-gen` is an Nx plugin, so a plain Angular CLI project cannot use it. Every
comparable tool (Orval, Hey API, ng-openapi-gen, ng-openapi, openapi-ng) ships a standalone CLI. This
is probably the biggest limit on adoption, and it also blocks a runnable StackBlitz demo, because a
plain StackBlitz project cannot run `nx g`.

## Goal

```bash
npx @constantant/openapi-resource-gen --specPath=openapi.yaml --outputDir=src/api
```

works in any Node project, produces byte-identical output to the Nx generator for the same options,
and the Nx plugin keeps working unchanged.

## Where the Nx coupling actually is

The generator (`generator.ts`) is already almost independent of Nx. Its entire Nx surface is:

| Used                                                                                       | Where                                                         | Replacement                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Tree` methods `write` (14×), `exists` (3×), `children`, `isFile`, `delete`, `listChanges` | file output and stale-file cleanup                            | a ~60-line `Tree` over the file system (read, write, delete, list, change log) |
| `updateJson`                                                                               | adding the `/mock` and `/msw` aliases to `tsconfig.base.json` | read/modify/write JSON                                                         |
| `generateFiles` (EJS templates, once)                                                      | emitting `api-base-url.token.ts` and the barrels              | render the same templates with `ejs` directly                                  |
| `formatFiles`                                                                              | Prettier over written files                                   | call `prettier` if resolvable, skip otherwise                                  |
| `joinPathFragments`, `logger`                                                              | paths, messages                                               | `path.posix.join`, `console`                                                   |

The Nx **executor** already proves the shape: it builds an `FsTree` rooted at the workspace, calls the
generator, then flushes the changes. A CLI is the same thing with `process.cwd()` as the root and
`process.argv` as the options. The catch is that `FsTree` lives in the `nx` package (an internal path),
so reusing it would force non-Nx users to install `nx` (about 35 MB) just to run a code generator.

## Options

**A. Thin `bin` over Nx's `FsTree`.** Smallest change: a `bin` entry that does what the executor does.
Cost: `nx` and `@nx/devkit` become hard dependencies for everyone, which defeats the point for
plain-Angular users, and it still reaches into an internal Nx path.

**B. Make the generator tree-agnostic, ship our own small tree.** Define a structural interface with
only the methods above; the Nx plugin passes Nx's `Tree`, the CLI passes our file-system tree. Make
`nx` / `@nx/devkit` optional peers (`peerDependenciesMeta`). Cost: a medium refactor and one new module;
the large existing test suite runs against both trees, so behaviour drift is caught.

**C. A separate `-cli` package that depends on the generator.** Same refactor as B (the generator must
stop importing `@nx/devkit` at load time), plus a second package to release and keep in step.
Only worth it if `bin` plus optional peers turns out to be confusing in practice.

**Recommendation: B, in one package.** One install, one version, one set of docs. Nx users see no change.

## Proposed CLI behaviour

- **Options** mirror `schema.json` one to one; derive the flag parser from it so they cannot drift
  (`--includeMocks`, `--clientType=httpClient`, `--callOptions`, …).
- **Config file** `openapi-resource-gen.json` (or `.config.json`): an array of entries, each with the
  same options, so `npx @constantant/openapi-resource-gen` with no arguments regenerates every API.
  This is what people expect from Orval and ng-openapi-gen, and it makes regeneration a one-liner in
  a `package.json` script.
- **Paths:** `outputDir` relative to the current directory (or `--root`). `--dry-run` prints the change
  list without writing; the generator already tracks created/updated/deleted files for `--verbose`.
- **Path aliases:** only added when `tsconfig.base.json` exists (today's behaviour). Plain Angular CLI
  projects usually have `tsconfig.json`; add `--tsconfig <file>` so the alias step can target it,
  otherwise print the one line to add.
- **Optional packages:** `includeMocks`, `includeMswHandlers` and `validateResponses` keep failing with
  the existing "requires X to be installed" message.
- **Exit codes:** non-zero on any error, so it works in CI.

## What changes in the code

1. `generator.ts`: take a `GeneratorTree` interface instead of importing `Tree`; replace the
   `@nx/devkit` helpers with local ones; load Prettier lazily.
2. New `src/cli/`: argument parsing, config file, the file-system tree, `bin`.
3. `package.json`: `bin`, `peerDependenciesMeta` marking `nx` / `@nx/devkit` optional.
4. The Nx generator and executor stay as thin wrappers over the same function.

## Verification plan

- Run the whole generator suite twice: once with Nx's tree, once with the CLI tree.
- A byte-for-byte comparison test: generate the four libs' specs with both paths and diff.
- A compat job (`tools/compat`) that creates a **plain Angular CLI project** (no Nx) at Angular 20 and
  22, runs the CLI, type-checks the output and runs the wire tests.
- Formatting parity: `formatFiles` also honours `.prettierrc` and sorts some JSON; the CLI must give
  the same text for the same repository, so the comparison test runs inside a repo with a Prettier config.

## Risks

- **Prettier differences** between `formatFiles` and a direct Prettier call (config discovery, ignore
  files). Mitigated by the diff test.
- **Windows path handling** in the tree (the generator already normalises with `replace(/\\/g, '/')`).
- **Two entry points to document.** The README quickstart gets two tabs (Nx, plain Angular CLI).
- **ESM-only dependencies** (`@scalar/openapi-upgrader` already needs a `require` plus `import()`
  fallback); the bin must keep that working on supported Node versions.

## Out of scope

Watch mode, remote spec polling, an `update-spec` command (listed in the roadmap as later work).

## Effort and order

Size M. Suggested order: (1) tree interface + local helpers with the existing tests green, (2) the CLI
and config file, (3) the plain-Angular compat job, (4) docs and the README quickstart, (5) the
runnable demo, which becomes possible once a plain project can run it.

## Open questions

1. Is a config file in the first version, or flags only? (Recommended: include it; it is small.)
2. Name of the bin: `openapi-resource-gen` (matches the package) or `oarg`?
3. Should the first release keep `nx` as a _recommended_ peer, or drop the Nx quickstart from the
   top of the README once the CLI exists?
