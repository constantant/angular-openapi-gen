# Contributing

Thanks for your interest in improving **angular-openapi-gen**! This repo hosts the
Nx generator [`@constantant/openapi-resource-gen`](https://www.npmjs.com/package/@constantant/openapi-resource-gen)
and a demo workspace that exercises it.

By participating you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** — open an issue using the *Bug report* form.
- **Request a feature** — open an issue using the *Feature request* form.
- **Ask a question / share an idea** — use [GitHub Discussions](../../discussions).
- **Send a pull request** — see the workflow below.

## Project layout

| Path | What it is | Edit by hand? |
|------|-----------|---------------|
| `tools/openapi-resource-gen/` | The Nx generator — the published npm package. **This is where fixes go.** | ✅ Yes |
| `apps/api-explorer/` | Angular 22 demo app that consumes the generated libs | ✅ Yes |
| `libs/*/src/` | Data-access libraries **generated** from OpenAPI specs | ❌ **Never** |
| `specs/` | OpenAPI specs the demo libs are generated from | ✅ Yes |

## ⚠️ Generated code is read-only

Files under `libs/*/src/` are 100% machine-generated and must **never** be edited
by hand. If you find a bug or missing feature in a generated file, fix it in the
generator (`tools/openapi-resource-gen/`) and **regenerate** the affected lib:

```bash
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=specs/petstore.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL
```

PRs that hand-edit generated files will be asked to move the fix into the
generator and regenerate. (`node_modules/@constantant/openapi-resource-gen` is a
junction to `tools/openapi-resource-gen`, so generator changes are live with no
publish step.)

## Local setup

Requirements: **Node 24** (matches CI) and npm.

```bash
npm ci
npx playwright install --with-deps   # needed for e2e
```

## Dev / verify loop

```bash
# Run the demo app
npx nx serve api-explorer

# Generator unit tests (run these for any generator change)
npx nx test openapi-resource-gen

# The full gate CI runs on every PR — make sure it's green before pushing:
npx nx run-many -t lint test build e2e
```

## Commit convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — a new feature (→ **minor** version bump)
- `fix:` — a bug fix (→ **patch** version bump)
- `chore:`, `docs:`, `refactor:`, `test:`, `ci:` — no version bump

The release version is derived automatically by `nx release` from commits that
touch `tools/openapi-resource-gen/`. Changes outside that folder (e.g. demo app,
docs, workflows) do **not** trigger a version bump. Please use a
conventional-commit-style **PR title** — it becomes the squash-merge commit.

## Pull request checklist

- [ ] Branched from `master`.
- [ ] `npx nx run-many -t lint test build e2e` passes locally.
- [ ] No files under `libs/*/src/` were hand-edited (regenerated instead).
- [ ] No `console.log` left in committed code.
- [ ] Docs (`README.md` / generator README) updated if behaviour changed.
- [ ] PR title follows Conventional Commits.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](LICENSE).
