#!/usr/bin/env node
/**
 * Compatibility matrix runner. Builds a throwaway workspace for one Angular (or Nx) version, installs
 * that version, copies in the code under test and runs it. Self-contained: needs only Node + npm, so
 * CI doesn't have to install this repository first.
 *
 *   node tools/compat/run.mjs angular <key>   # key from matrix.json: 20-min | 20 | 21 | 22
 *   node tools/compat/run.mjs nx <key>        # key from matrix.json: 20 | 21 | 22 | 23
 *   node tools/compat/run.mjs --list
 *   add --keep to leave the workspace behind for debugging
 *
 * angular: type-checks (strict) and tests the generated libs, the generated mock files and the
 *          mocks package against that Angular version — the wire-level tests use a real HttpClient.
 * nx:      runs the generator's test suite plus a real end-to-end generation (FsTree, Prettier)
 *          against that Nx version.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..', '..');
const matrix = JSON.parse(readFileSync(join(here, 'matrix.json'), 'utf8'));

const args = process.argv.slice(2);
const keep = args.includes('--keep');
const [kind, key] = args.filter((a) => !a.startsWith('--'));

if (args.includes('--list') || !kind) {
  for (const [k, entries] of Object.entries(matrix)) {
    console.log(`${k}: ${Object.entries(entries).map(([id, e]) => `${id} (${e.note})`).join(', ')}`);
  }
  process.exit(args.includes('--list') ? 0 : 1);
}

const entry = matrix[kind]?.[key];
if (!entry) {
  console.error(`Unknown target "${kind} ${key}". Run with --list.`);
  process.exit(1);
}

const win = process.platform === 'win32';
function run(cmd, cmdArgs, cwd) {
  console.log(`\n$ ${cmd} ${cmdArgs.join(' ')}`);
  const r = spawnSync(cmd, cmdArgs, { cwd, stdio: 'inherit', shell: win });
  if (r.status !== 0) throw new Error(`${cmd} ${cmdArgs[0]} failed (exit ${r.status})`);
}
const write = (file, text) => writeFileSync(file, text);
const template = (...p) => readFileSync(join(here, 'templates', ...p), 'utf8');

const dir = mkdtempSync(join(tmpdir(), `oarg-compat-${kind}-${key}-`));
console.log(`workspace: ${dir}`);

try {
  if (kind === 'angular') await angular();
  else await nx();
  console.log(`\n✔ ${kind} ${key} (${entry.note}) passed`);
} catch (e) {
  console.error(`\n✖ ${kind} ${key} (${entry.note}) FAILED: ${e.message}`);
  process.exitCode = 1;
} finally {
  if (keep) console.log(`kept: ${dir}`);
  else rmSync(dir, { recursive: true, force: true });
}

async function angular() {
  const ng = entry.angular;
  write(join(dir, 'package.json'), JSON.stringify({ name: `compat-ng-${key}`, private: true, type: 'module' }));
  const pkgs = [
    ...['core', 'common', 'compiler', 'platform-browser'].map((p) => `@angular/${p}@${ng}`),
    'rxjs@~7.8.0', 'tslib', `typescript@${entry.typescript}`, 'vitest@^4.1.10', 'jsdom@^30', '@cfworker/json-schema@^4.1.1',
    ...(entry.zone ? ['zone.js@~0.15.1'] : []),
  ];
  run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error', ...pkgs], dir);
  const v = (p) => JSON.parse(readFileSync(join(dir, 'node_modules', ...p.split('/'), 'package.json'), 'utf8')).version;
  console.log(`\nAngular ${v('@angular/core')} · TypeScript ${v('typescript')}`);

  // Code under test: every generated lib and the mocks package (sources, specs included).
  mkdirSync(join(dir, 'src', 'libs'), { recursive: true });
  for (const name of readdirSync(join(repo, 'libs')).filter((n) => n.endsWith('-data-access'))) {
    cpSync(join(repo, 'libs', name, 'src'), join(dir, 'src', 'libs', name.replace('-data-access', '')), { recursive: true });
  }
  cpSync(join(repo, 'tools', 'openapi-resource-mocks', 'src'), join(dir, 'src', 'mocks'), { recursive: true });

  // The repo's own wire-level spec, re-pointed at the copied libs. `TestBed.tick()` only exists from
  // Angular 20.x onward, so go through a tolerant helper.
  write(join(dir, 'src', 'tick.ts'),
    `import { TestBed } from '@angular/core/testing';\n` +
    `export function tick(): void {\n` +
    `  const t = TestBed as unknown as { tick?: () => void; flushEffects?: () => void };\n` +
    `  (t.tick ?? t.flushEffects)!.call(t);\n}\n`);
  const wire = readFileSync(join(repo, 'apps', 'api-explorer', 'src', 'app', 'generated-query-params.spec.ts'), 'utf8')
    .replace(/'@angular-openapi-gen\/([a-z]+)-data-access'/g, `'./libs/$1'`)
    .replaceAll('TestBed.tick()', 'tick()');
  write(join(dir, 'src', 'wire.spec.ts'), `import { tick } from './tick';\n${wire}`);
  write(join(dir, 'src', 'extra.spec.ts'), template('angular', 'extra.spec.ts'));

  write(join(dir, 'setup.ts'),
    (entry.zone ? `import 'zone.js';\nimport 'zone.js/testing';\n` : '') +
    `import '@angular/compiler';\n` +
    `import { getTestBed } from '@angular/core/testing';\n` +
    `import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';\n` +
    `getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());\n`);
  write(join(dir, 'vitest.config.ts'), template('angular', 'vitest.config.ts'));
  write(join(dir, 'tsconfig.json'), template('angular', 'tsconfig.json'));

  run('npx', ['tsc', '-p', 'tsconfig.json'], dir);
  run('npx', ['vitest', 'run'], dir);
}

async function nx() {
  write(join(dir, 'package.json'), JSON.stringify({ name: `compat-nx-${key}`, private: true }));
  run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error',
    `nx@${entry.nx}`, `@nx/devkit@${entry.nx}`, 'vitest@^4.1.10', 'prettier@^3', 'tslib', 'js-yaml@^5.4.2',
    '@apidevtools/swagger-parser@^13.1.0', 'openapi-typescript@^7.13.0', 'openapi-types@^12.1.3', '@cfworker/json-schema@^4.1.1', '@scalar/openapi-upgrader@^0.4.1'], dir);
  const nxVersion = JSON.parse(readFileSync(join(dir, 'node_modules', 'nx', 'package.json'), 'utf8')).version;
  console.log(`\nNx ${nxVersion}`);

  cpSync(join(repo, 'tools', 'openapi-resource-gen', 'src'), join(dir, 'src'), { recursive: true });
  mkdirSync(join(dir, 'specs'), { recursive: true });
  cpSync(join(repo, 'specs', 'petstore.yaml'), join(dir, 'specs', 'petstore.yaml'));
  write(join(dir, 'vitest.config.ts'), template('nx', 'vitest.config.ts'));
  write(join(dir, 'e2e.spec.ts'), template('nx', 'e2e.spec.ts'));
  if (!existsSync(join(dir, 'specs', 'petstore.yaml'))) throw new Error('specs/petstore.yaml missing');
  run('npx', ['vitest', 'run'], dir);
}
