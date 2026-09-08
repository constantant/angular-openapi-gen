import { build } from 'esbuild';
import { cpSync, mkdirSync, readdirSync, rmSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..');
const src  = resolve(__dirname, '../src');
const out  = resolve(root, 'dist/tools/openapi-resource-devtools');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Copy the Angular panel's build output into the extension folder.
// devtools-panel:build is declared as an Nx `dependsOn` for this target
// (see project.json), so Nx always builds it first - shelling out to
// `nx build devtools-panel` here used to cause Nx to detect a recursive
// task invocation whenever this target was already part of a larger
// affected/build run.
const panelDist = resolve(root, 'dist/apps/devtools-panel/browser');
for (const name of readdirSync(panelDist)) {
  cpSync(join(panelDist, name), join(out, name), { recursive: true });
}

// 3. Bundle the three extension scripts (content, SW, devtools page)
await build({
  entryPoints: {
    devtools: join(src, 'devtools.ts'),
    sw:       join(src, 'background/sw.ts'),
    content:  join(src, 'content/content.ts'),
  },
  bundle: true,
  outdir: out,
  format: 'iife',
  platform: 'browser',
  treeShaking: true,
  minify: false,
  sourcemap: 'inline',
  tsconfig: resolve(__dirname, '../tsconfig.json'),
  logLevel: 'info',
});

// 4. Copy manifest, devtools.html, and icons
cpSync(join(__dirname, '../manifest.json'),  join(out, 'manifest.json'));
cpSync(join(src, 'devtools.html'),           join(out, 'devtools.html'));
cpSync(join(__dirname, '../icons'),          join(out, 'icons'), { recursive: true });

console.log(`\nExtension ready → ${out}`);
console.log('Load in Chrome: chrome://extensions → "Load unpacked" → select that folder\n');
