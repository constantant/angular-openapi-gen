#!/usr/bin/env node
/**
 * Release script for the Chrome Extension (openapi-resource-devtools).
 *
 * Usage:
 *   node scripts/release.mjs [patch|minor|major]
 *   (default: auto-detect from conventional commits since the last tag)
 *
 * What it does:
 *   1. Reads the current version from manifest.json
 *   2. Scans git log since the last openapi-resource-devtools@* tag
 *   3. Determines the bump type (or uses the CLI argument)
 *   4. Bumps manifest.json
 *   5. Prepends a changelog entry to CHANGELOG.md (nx-style format)
 *   6. Creates a git commit and tag
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync }                     from 'node:child_process';
import { dirname, resolve }             from 'node:path';
import { fileURLToPath }                from 'node:url';

const __dir        = dirname(fileURLToPath(import.meta.url));
const root         = resolve(__dir, '../../..');
const manifestPath = resolve(__dir, '../manifest.json');
const changelogPath = resolve(__dir, '../CHANGELOG.md');
const repoUrl      = 'https://github.com/constantant/angular-openapi-gen';

const exec = (cmd, opts = {}) =>
  execSync(cmd, { cwd: root, encoding: 'utf8', ...opts }).trim();

// ── 1. Read current version ───────────────────────────────────────────────
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const currentVersion = manifest.version;
console.log(`Current version: ${currentVersion}`);

// ── 2. Gather commits since last tag ─────────────────────────────────────
let lastTag = '';
try {
  lastTag = exec(
    'git describe --tags --abbrev=0 --match="openapi-resource-devtools@*"',
  );
} catch { /* no previous tag — first release */ }

const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
// Filter to commits that touched either the extension shell or the Angular panel.
const rawLog = exec(
  `git log ${range} --pretty=format:"%H %s" -- ` +
  `tools/openapi-resource-devtools/ apps/devtools-panel/`,
);
const commits = rawLog ? rawLog.split('\n').filter(Boolean) : [];
console.log(`Commits since ${lastTag || 'beginning'}: ${commits.length}`);

// ── 3. Determine version bump ─────────────────────────────────────────────
const VALID_BUMPS = ['patch', 'minor', 'major'];
const requestedBump = process.argv[2];

function detectBump(messages) {
  if (messages.some(m => m.includes('BREAKING CHANGE') || /^[^(]+!:/.test(m)))
    return 'major';
  if (messages.some(m => /^feat(\([^)]+\))?[!:?]/.test(m)))
    return 'minor';
  return 'patch';
}

function bumpSemver(version, type) {
  const [maj, min, pat] = version.split('.').map(Number);
  if (type === 'major') return `${maj + 1}.0.0`;
  if (type === 'minor') return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${pat + 1}`;
}

const bumpType = VALID_BUMPS.includes(requestedBump)
  ? requestedBump
  : detectBump(commits.map(l => l.slice(41)));

const newVersion = bumpSemver(currentVersion, bumpType);
console.log(`Bump type: ${bumpType}  →  ${currentVersion} → ${newVersion}`);

// ── 4. Generate CHANGELOG entry ───────────────────────────────────────────
const date = new Date().toISOString().slice(0, 10);

const sections = {
  feat:  { emoji: '🚀', label: 'Features',         entries: [] },
  fix:   { emoji: '🩹', label: 'Bug Fixes',         entries: [] },
  perf:  { emoji: '⚡', label: 'Performance',       entries: [] },
  docs:  { emoji: '📖', label: 'Documentation',     entries: [] },
  refactor: { emoji: '🔧', label: 'Refactoring',   entries: [] },
  other: { emoji: null,  label: 'Changes',          entries: [] },
};

const COMMIT_RE = /^(feat|fix|perf|docs|refactor|chore|style|test|build|ci)(\([^)]+\))?[!:]?\s+(.*)/;

for (const line of commits) {
  const hash  = line.slice(0, 40);
  const msg   = line.slice(41);
  const short = hash.slice(0, 7);
  const link  = `([${short}](${repoUrl}/commit/${hash}))`;

  const m = msg.match(COMMIT_RE);
  if (!m) { sections.other.entries.push(`- ${msg} ${link}`); continue; }

  const [, type, scope, description] = m;
  const scopeStr = scope ? `**${scope.slice(1, -1)}:** ` : '';
  const entry    = `- ${scopeStr}${description} ${link}`;

  if (type === 'feat')     sections.feat.entries.push(entry);
  else if (type === 'fix') sections.fix.entries.push(entry);
  else if (type === 'perf') sections.perf.entries.push(entry);
  else if (type === 'docs') sections.docs.entries.push(entry);
  else if (type === 'refactor') sections.refactor.entries.push(entry);
  // chore/style/test/build/ci/other: omit from changelog (no user-visible impact)
}

let changelogEntry = `## ${newVersion} (${date})\n\n`;
for (const s of Object.values(sections)) {
  if (!s.entries.length) continue;
  const heading = s.emoji ? `### ${s.emoji} ${s.label}` : `### ${s.label}`;
  changelogEntry += `${heading}\n\n${s.entries.join('\n')}\n\n`;
}
if (changelogEntry === `## ${newVersion} (${date})\n\n`) {
  changelogEntry += `_No user-facing changes._\n\n`;
}

// Prepend to CHANGELOG.md (insert after the `# Changelog` header if present)
let existing = '';
try { existing = readFileSync(changelogPath, 'utf8'); } catch { /* first run */ }

let newContent;
if (existing.startsWith('# Changelog')) {
  const insertAt = existing.indexOf('\n\n') + 2;
  newContent = existing.slice(0, insertAt) + changelogEntry + existing.slice(insertAt);
} else {
  newContent = `# Changelog\n\n${changelogEntry}${existing}`;
}
writeFileSync(changelogPath, newContent);

// ── 5. Update manifest.json ───────────────────────────────────────────────
manifest.version = newVersion;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

// ── 6. Git commit and tag ─────────────────────────────────────────────────
exec(
  'git add tools/openapi-resource-devtools/manifest.json ' +
           'tools/openapi-resource-devtools/CHANGELOG.md',
);
exec(
  `git commit -m "chore(release): openapi-resource-devtools@${newVersion}"`,
);
exec(`git tag -a openapi-resource-devtools@${newVersion} -m "openapi-resource-devtools@${newVersion}"`);

console.log(`\n✓  openapi-resource-devtools@${newVersion} ready.`);
console.log(`   Tag: openapi-resource-devtools@${newVersion}`);
console.log(`   Run 'git push --follow-tags origin master' to publish.\n`);
