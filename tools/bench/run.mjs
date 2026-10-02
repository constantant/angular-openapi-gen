#!/usr/bin/env node
/**
 * Bundle-size benchmark: how much does a production Angular bundle grow when an app uses N endpoints
 * of the 76-endpoint YouTube Data API v3 spec, per generator?
 *
 *   node tools/bench/run.mjs            # prints a markdown report
 *   node tools/bench/run.mjs --keep     # keep the throwaway workspace for inspection
 *
 * Self-contained (Node + npm + network). Everything is installed into a temp workspace; the numbers
 * are the size of the production `main.js` (esbuild via @angular/build) before and after gzip.
 * Versions of every tool are printed in the report. Re-run it to check the claims.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..', '..');
const keep = process.argv.includes('--keep');
const ANGULAR = '~22.2.0';

// Operations used by the "8 endpoints" scenario; the first is the "1 endpoint" scenario.
const OPS = [
  'youtube.search.list', 'youtube.videos.list', 'youtube.channels.list', 'youtube.playlists.list',
  'youtube.playlistItems.list', 'youtube.comments.list', 'youtube.commentThreads.list', 'youtube.subscriptions.list',
];

const win = process.platform === 'win32';
function run(cmd, args, cwd, quiet = true) {
  const r = spawnSync(cmd, args, { cwd, shell: win, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} failed:\n${r.stdout}\n${r.stderr}`);
  if (!quiet) console.error(r.stdout);
  return r.stdout;
}
const log = (m) => console.error(m);

const dir = mkdtempSync(join(tmpdir(), 'oarg-bench-'));
log(`workspace: ${dir}`);

const camel = (id) => id.replace(/[._-](\w)/g, (_, c) => c.toUpperCase());
const pascal = (id) => camel(id).replace(/^\w/, (c) => c.toUpperCase());
const snake = (id) => id.replace(/[.\-]/g, '_').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

try {
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'bench', private: true }));
  writeFileSync(join(dir, 'nx.json'), JSON.stringify({ extends: 'nx/presets/npm.json' }));
  log('installing…');
  run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error',
    ...['core', 'common', 'compiler', 'platform-browser', 'compiler-cli', 'build', 'cli'].map((p) => `@angular/${p}@${ANGULAR}`),
    'typescript@~6.0.0', 'rxjs', 'tslib', 'nx@~22.7.0', '@nx/devkit@~22.7.0', 'prettier@^3', 'js-yaml@^4',
    '@constantant/openapi-resource-gen@latest', 'orval@latest', 'ng-openapi-gen@latest', '@hey-api/openapi-ts@latest'], dir);
  const ver = (p) => JSON.parse(readFileSync(join(dir, 'node_modules', p, 'package.json'), 'utf8')).version;
  const versions = {
    angular: ver('@angular/core'), 'openapi-resource-gen': ver('@constantant/openapi-resource-gen'),
    orval: ver('orval'), 'ng-openapi-gen': ver('ng-openapi-gen'), '@hey-api/openapi-ts': ver('@hey-api/openapi-ts'),
  };

  const spec = join(dir, 'youtube.yaml');
  writeFileSync(spec, readFileSync(join(repo, 'specs', 'youtube.yaml')));
  const { load } = await import(join(dir, 'node_modules', 'js-yaml', 'dist', 'js-yaml.mjs'));
  const doc = load(readFileSync(spec, 'utf8'));
  const tagOf = {};
  for (const item of Object.values(doc.paths)) for (const op of Object.values(item)) if (op?.operationId) tagOf[op.operationId] = op.tags?.[0] ?? 'default';
  const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[._\s]/g, '-').toLowerCase();

  log('generating clients…');
  const nxg = (out, extra = []) => run('npx', ['nx', 'g', '@constantant/openapi-resource-gen:api-resource', '--specPath=youtube.yaml',
    `--outputDir=src/${out}`, '--baseUrlToken=YOUTUBE_BASE_URL', '--no-interactive', ...extra], dir);
  nxg('ours');
  nxg('ours-client', ['--clientType=httpClient']);
  writeFileSync(join(dir, 'ng-openapi-gen.json'), JSON.stringify({ input: 'youtube.yaml', output: 'src/ngoag' }));
  run('npx', ['ng-openapi-gen'], dir);
  writeFileSync(join(dir, 'orval.config.mjs'), `export default { youtube: { input: 'youtube.yaml', output: { target: 'src/orval/api.ts', schemas: 'src/orval/model', client: 'angular', mode: 'tags-split' } } };`);
  run('npx', ['orval', '--config', 'orval.config.mjs'], dir);
  run('npx', ['@hey-api/openapi-ts', '-i', 'youtube.yaml', '-o', 'src/heyapi', '-c', '@hey-api/client-angular'], dir);

  // ---- variants ---------------------------------------------------------------------------------
  const head = (extra = '') => `import { Component, inject } from '@angular/core';\nimport { HttpClient, httpResource, provideHttpClient } from '@angular/common/http';\nimport { bootstrapApplication } from '@angular/platform-browser';\n${extra}\n`;
  const shell = (body, providers = 'provideHttpClient()') => `@Component({ selector: 'app-root', template: '' })\nclass App {\n  constructor() {\n${body}\n  }\n}\nbootstrapApplication(App, { providers: [${providers}] });\n`;
  const URL = 'https://youtube.googleapis.com/youtube/v3/';
  const path = (id) => id.replace(/^youtube\./, '').replace(/\./g, '/');

  // ng-openapi-gen puts each function in fn/<tag-folder>/<kebab-operation-id>.ts
  const ngRoot = join(dir, 'src', 'ngoag', 'fn');
  const ngFolder = (id) => {
    const f = readdirSync(ngRoot).find((d) => existsSync(join(ngRoot, d, `${kebab(id)}.ts`)));
    if (!f) throw new Error(`ng-openapi-gen: no file for ${id}`);
    return f;
  };

  const variants = {
    baseline: (ops) => head() + shell(ops.map((id) => `    inject(HttpClient).get('${URL}${path(id)}', { params: { part: 'snippet' } }).subscribe(console.log);`).join('\n')),
    'httpResource (no generator)': (ops) => head() + shell(ops.map((id) => `    console.log(httpResource(() => ({ url: '${URL}${path(id)}', params: { part: 'snippet' } })).value());`).join('\n')),
    'openapi-resource-gen (httpResource)': (ops) => head(`import { YOUTUBE_BASE_URL, ${ops.flatMap((id) => [snake(id), `provide${pascal(id)}`]).join(', ')} } from '../../ours';`)
      + shell(ops.map((id) => `    console.log(inject(${snake(id)})({ part: ['snippet'] } as never).value());`).join('\n'),
        `provideHttpClient(), { provide: YOUTUBE_BASE_URL, useValue: 'https://youtube.googleapis.com' }, ${ops.map((id) => `provide${pascal(id)}()`).join(', ')}`),
    'openapi-resource-gen (httpClient)': (ops) => head(`import { YOUTUBE_BASE_URL, ${ops.flatMap((id) => [snake(id), `provide${pascal(id)}`]).join(', ')} } from '../../ours-client';`)
      + shell(ops.map((id) => `    inject(${snake(id)})({ part: ['snippet'] } as never).subscribe(console.log);`).join('\n'),
        `provideHttpClient(), { provide: YOUTUBE_BASE_URL, useValue: 'https://youtube.googleapis.com' }, ${ops.map((id) => `provide${pascal(id)}()`).join(', ')}`),
    'ng-openapi-gen (Api.invoke, deep fn imports)': (ops) => head(`import { Api } from '../../ngoag/api';\nimport { ApiConfiguration } from '../../ngoag/api-configuration';\n${ops.map((id) => `import { ${camel(id)} } from '../../ngoag/fn/${ngFolder(id)}/${kebab(id)}';`).join('\n')}`)
      + shell(`    const api = inject(Api);\n` + ops.map((id) => `    api.invoke(${camel(id)}, { part: ['snippet'] } as never).then(console.log);`).join('\n'),
        `provideHttpClient(), { provide: ApiConfiguration, useValue: { rootUrl: 'https://youtube.googleapis.com' } }`),
    'ng-openapi-gen (Api.invoke, functions barrel)': (ops) => head(`import { Api } from '../../ngoag/api';\nimport { ApiConfiguration } from '../../ngoag/api-configuration';\nimport { ${ops.map(camel).join(', ')} } from '../../ngoag/functions';`)
      + shell(`    const api = inject(Api);\n` + ops.map((id) => `    api.invoke(${camel(id)}, { part: ['snippet'] } as never).then(console.log);`).join('\n'),
        `provideHttpClient(), { provide: ApiConfiguration, useValue: { rootUrl: 'https://youtube.googleapis.com' } }`),
    'Orval (angular, tags-split)': (ops) => {
      const tags = [...new Set(ops.map((id) => tagOf[id]))];
      const svc = (t) => `${pascal(t)}Service`;
      return head(tags.map((t) => `import { ${svc(t)} } from '../../orval/${kebab(t)}/${kebab(t)}.service';`).join('\n'))
        + shell(ops.map((id) => `    inject(${svc(tagOf[id])}).${camel(id)}({ part: ['snippet'] } as never).subscribe(console.log);`).join('\n'));
    },
    'Hey API (client-angular)': (ops) => head(`import { ${ops.map(camel).join(', ')} } from '../../heyapi';`)
      + shell(ops.map((id) => `    ${camel(id)}({ query: { part: ['snippet'] } } as never).then(console.log);`).join('\n')),
  };

  writeFileSync(join(dir, 'angular.json'), JSON.stringify({ version: 1, cli: { analytics: false }, projects: { bench: { projectType: 'application', root: '', sourceRoot: 'src',
    architect: { build: { builder: '@angular/build:application', options: { browser: 'src/main.ts', tsConfig: 'tsconfig.json', index: 'src/index.html', outputHashing: 'none', aot: true },
      configurations: { production: { optimization: true, sourceMap: false } }, defaultConfiguration: 'production' } } } } }));
  writeFileSync(join(dir, 'src', 'index.html'), '<!doctype html><html><head><base href="/"></head><body><app-root></app-root></body></html>');

  const results = {};
  let n = 0;
  for (const [scenario, ops] of [['1 endpoint', OPS.slice(0, 1)], ['8 endpoints', OPS]]) {
    results[scenario] = {};
    for (const [name, make] of Object.entries(variants)) {
      const id = `v${n++}`;
      const vdir = join(dir, 'src', 'variants', id);
      mkdirSync(vdir, { recursive: true });
      writeFileSync(join(vdir, 'main.ts'), make(ops));
      writeFileSync(join(dir, `tsconfig.${id}.json`), JSON.stringify({ extends: './tsconfig.json', include: [], files: [`src/variants/${id}/main.ts`] }));
      if (n === 1) writeFileSync(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { strict: true, target: 'ES2022', module: 'preserve', moduleResolution: 'bundler', experimentalDecorators: true, skipLibCheck: true, isolatedModules: true, lib: ['ES2022', 'dom'] }, files: [] , angularCompilerOptions: { strictTemplates: true } }));
      log(`building ${scenario} · ${name}`);
      run('npx', ['ng', 'build', `--output-path=out/${id}`, `--browser=src/variants/${id}/main.ts`, `--ts-config=tsconfig.${id}.json`], dir);
      const js = readFileSync(join(dir, 'out', id, 'browser', 'main.js'));
      results[scenario][name] = { raw: js.length, gzip: gzipSync(js).length };
    }
  }

  const kb = (b) => (b / 1000).toFixed(1);
  const lines = [`# Bundle-size benchmark (YouTube Data API v3, 76 endpoints)`, '',
    `Production \`main.js\` of a minimal Angular app that bootstraps and calls the listed endpoints. Run \`node tools/bench/run.mjs\` to reproduce.`, '',
    `Versions: ${Object.entries(versions).map(([k, v]) => `${k} ${v}`).join(', ')}.`, ''];
  for (const [scenario, rows] of Object.entries(results)) {
    const base = rows.baseline;
    lines.push(`## ${scenario}`, '', '| Variant | main.js (kB) | gzip (kB) | vs baseline (gzip) |', '|---|---:|---:|---:|');
    for (const [name, r] of Object.entries(rows)) lines.push(`| ${name} | ${kb(r.raw)} | ${kb(r.gzip)} | ${name === 'baseline' ? '—' : `+${kb(r.gzip - base.gzip)}`} |`);
    lines.push('');
  }
  console.log(lines.join('\n'));
} finally {
  if (!keep) rmSync(dir, { recursive: true, force: true });
  else log(`kept ${dir}`);
}
