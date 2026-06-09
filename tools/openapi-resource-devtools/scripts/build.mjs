import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..');
const src = resolve(__dirname, '../src');
const out = resolve(root, 'dist/tools/openapi-resource-devtools');

mkdirSync(out, { recursive: true });

await build({
  entryPoints: {
    devtools: join(src, 'devtools.ts'),
    sw: join(src, 'background/sw.ts'),
    content: join(src, 'content/content.ts'),
    panel: join(src, 'panel/panel.tsx'),
  },
  bundle: true,
  outdir: out,
  format: 'iife',
  platform: 'browser',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  treeShaking: true,
  minify: false,
  sourcemap: 'inline',
  tsconfig: resolve(__dirname, '../tsconfig.json'),
  logLevel: 'info',
});

const statics = [
  ['manifest.json',          'manifest.json'],
  ['src/devtools.html',      'devtools.html'],
  ['src/panel/panel.html',   'panel.html'],
  ['src/panel/panel.css',    'panel.css'],
];

for (const [from, to] of statics) {
  cpSync(join(__dirname, '..', from), join(out, to));
}

console.log(`\nExtension ready → ${out}`);
console.log('Load it in Chrome: chrome://extensions → "Load unpacked" → select that folder\n');
