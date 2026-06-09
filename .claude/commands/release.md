# Release

Execute a full release of `@constantant/openapi-resource-gen` and `@constantant/openapi-resource-mocks`. Follow every step in order — do not skip any.

## Step 1 — pre-flight checks

Run these in parallel:
- `git status` — confirm no uncommitted changes (warn the user if there are any)
- `git log --oneline -5` — show recent commits for context
- `git log openapi-resource-gen@$(node -p "require('./tools/openapi-resource-gen/package.json').version")..HEAD --oneline -- tools/openapi-resource-gen/` — unreleased generator commits
- `git log openapi-resource-mocks@$(node -p "require('./tools/openapi-resource-mocks/package.json').version")..HEAD --oneline -- tools/openapi-resource-mocks/` — unreleased mocks commits

If there are uncommitted changes, stop and tell the user to commit or stash them first.

## Step 2 — dry-run preview

Run: `npx nx release --dry-run 2>&1`

Show the user:
- The resolved version bump for each package (patch / minor / major) and why
- The new version numbers
- The CHANGELOG entries that would be generated

## Step 3 — confirm with the user

Ask the user:
1. Are the auto-detected version bumps correct, or do they want to override?
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

Examples:
```bash
# Auto-detected bump (most common)
gh workflow run release.yml

# Force a specific bump
gh workflow run release.yml --field specifier=patch

# Pre-release beta
gh workflow run release.yml --field specifier=prerelease --field preid=beta

# Dry run preview only
gh workflow run release.yml --field dryRun=true
```

## Step 5 — monitor the run

Get the run ID and watch it:
```bash
gh run list --workflow=release.yml --limit=1 --json databaseId --jq '.[0].databaseId'
gh run watch <run-id> --exit-status
```

## Step 6 — report the result

On success: show both published versions, their npm URLs, and the GitHub Release URLs.
On failure: show the failed step and its logs — `gh run view <run-id> --log-failed`.

---

## Key facts

- Two packages are released independently: `@constantant/openapi-resource-gen` and `@constantant/openapi-resource-mocks`. Each gets its own version bump based on its own commit history (`projectsRelationship: "independent"` in nx.json).
- Tags: `openapi-resource-gen@<version>` and `openapi-resource-mocks@<version>`.
- Bump rules: `feat:` → minor; `fix:`/`perf:` → patch; `docs:`/`chore:`/`ci:` → no bump. `useCommitScope: false` means all commits count regardless of scope.
- Pre-release versions (containing `-`) are published under the `next` dist-tag automatically.
- The workflow creates GitHub Releases and publishes to npm — never do these manually.
- Never run `nx release` locally before triggering the workflow — the workflow does the full pipeline.
