# Release @constantant/openapi-resource-gen

Execute a full release of the npm package. Follow every step below in order — do not skip any.

## Step 1 — pre-flight checks

Run these in parallel:
- `git status` — confirm no uncommitted changes (warn the user if there are any)
- `git log --oneline -5` — show recent commits for context
- `git log openapi-resource-gen@$(node -p "require('./tools/openapi-resource-gen/package.json').version")..HEAD --oneline -- tools/openapi-resource-gen/` — show which generator commits are unreleased

If there are uncommitted changes, stop and tell the user to commit or stash them first.

## Step 2 — dry-run preview

Run: `npx nx release --dry-run 2>&1`

Show the user:
- The resolved version bump (patch / minor / major) and why
- The new version number
- The CHANGELOG entries that would be generated

## Step 3 — confirm with the user

Ask the user:
1. Is the auto-detected version bump correct, or do they want to override it?
   - If override: which specifier? (patch / minor / major / premajor / preminor / prepatch / prerelease)
   - If prerelease: which preid? (alpha / beta / rc)
2. Dry run only, or publish for real?

Do NOT proceed until the user explicitly confirms.

## Step 4 — trigger the GitHub Actions release workflow

Use `gh workflow run release.yml` with the inputs from step 3.

Flags to pass:
- `--field specifier=<value>` — only if the user chose to override (leave empty for auto)
- `--field preid=<value>` — only if a preid was specified
- `--field dryRun=true` — only if the user asked for dry run

Example for an auto minor release:
```
gh workflow run release.yml
```

Example for a forced patch with no publish:
```
gh workflow run release.yml --field specifier=patch --field dryRun=true
```

Example for a beta pre-release:
```
gh workflow run release.yml --field specifier=prerelease --field preid=beta
```

## Step 5 — monitor the run

After triggering, wait a moment and then get the run ID:
```
gh run list --workflow=release.yml --limit=1 --json databaseId --jq '.[0].databaseId'
```

Then watch it:
```
gh run watch <run-id> --exit-status
```

## Step 6 — report the result

On success: show the published version, npm URL, and the GitHub Release URL.
On failure: show the failed step and its logs — run `gh run view <run-id> --log-failed`.

## Key facts to keep in mind

- The package is `@constantant/openapi-resource-gen`, published to npm under the `constantant` scope.
- Tags follow the pattern `openapi-resource-gen@<version>` (e.g. `openapi-resource-gen@1.2.0`).
- `feat:` commits → minor bump; `fix:`/`perf:` → patch; `docs:`/`chore:`/`ci:` → no bump.
- `useCommitScope: false` in nx.json means ALL commits count regardless of scope — `feat(generator):` correctly triggers a minor bump.
- Pre-release versions (containing `-`) are published under the `next` dist-tag automatically.
- The workflow creates the GitHub Release itself via `GITHUB_TOKEN` — do not run `gh release create` separately.
- Never manually edit files under `libs/*/src/` — those are generated. Generator bugs go through `tools/openapi-resource-gen/`.
