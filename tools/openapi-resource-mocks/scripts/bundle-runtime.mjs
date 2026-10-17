// Bundles the framework-free runtime into dist/.../src/runtime.global.js, the script the Playwright
// helper (`/playwright`) loads into pages. Runs after the TypeScript build, from its output, with
// the helper's own bundle options so the two never drift.
import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { buildSync } from 'esbuild';

const require = createRequire(import.meta.url);
const dist = path.resolve(import.meta.dirname, '../../../dist/tools/openapi-resource-mocks/src');
const entry = path.join(dist, 'runtime.js');
if (!fs.existsSync(entry)) throw new Error(`Build the package first: ${entry} is missing.`);
const { RUNTIME_BUNDLE_OPTIONS } = require(path.join(dist, 'playwright.js'));

const outfile = path.join(dist, 'runtime.global.js');
buildSync({ ...RUNTIME_BUNDLE_OPTIONS, entryPoints: [entry], outfile, minify: true, legalComments: 'none' });
console.log(`runtime.global.js: ${fs.statSync(outfile).size} bytes`);
