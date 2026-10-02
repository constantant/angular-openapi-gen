/**
 * Shared by the *.integration.spec.ts files: runs the real generator and parser on a spec written to
 * disk, then compiles the output with the TypeScript compiler. No mocks.
 *
 * Output goes under node_modules/.cache so `@angular/*` and `rxjs` resolve by walking up, with no
 * path mapping. Callers remove the directory afterwards with `cleanup()`.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { apiResourceGenerator } from './generator';

const { FsTree, flushChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');

const repoRoot = path.resolve(__dirname, '../../../../..');

export interface GeneratedWorkspace {
  /** The workspace root on disk. */
  root: string;
  /** Compiler diagnostics for everything generated plus the probe, as `file: message` lines. */
  diagnostics: string[];
  /** Reads a generated file, relative to the `out` directory. */
  read(file: string): string;
  exists(file: string): boolean;
}

export function integrationWorkspace(cacheName: string) {
  const cacheRoot = path.join(repoRoot, 'node_modules', '.cache', cacheName);

  async function generateAndCompile(
    name: string,
    spec: { fileName: string; text: string },
    options: Record<string, unknown>,
    probe = '',
  ): Promise<GeneratedWorkspace> {
    const root = path.join(cacheRoot, name);
    fs.rmSync(root, { recursive: true, force: true });
    fs.mkdirSync(root, { recursive: true });
    fs.writeFileSync(path.join(root, spec.fileName), spec.text);
    fs.writeFileSync(path.join(root, 'tsconfig.base.json'), JSON.stringify({ compilerOptions: { paths: {} } }));
    fs.writeFileSync(path.join(root, 'package.json'), '{"name":"ws"}');
    fs.writeFileSync(path.join(root, 'probe.ts'), probe);

    const previous = process.cwd();
    process.chdir(root);
    try {
      const tree = new FsTree(root, false);
      await apiResourceGenerator(tree, { specPath: spec.fileName, outputDir: 'out', baseUrlToken: 'API_BASE_URL', ...options } as never);
      flushChanges(root, tree.listChanges());
    } finally {
      process.chdir(previous);
    }

    const files: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith('.ts')) files.push(full);
      }
    };
    walk(root);

    const parsed = ts.parseJsonConfigFileContent(
      {
        compilerOptions: {
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          target: 'es2022',
          module: 'esnext',
          moduleResolution: 'bundler',
          lib: ['es2022', 'dom'],
          types: [],
        },
      },
      ts.sys,
      root,
    );
    const program = ts.createProgram(files, parsed.options);
    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .map((d) => `${d.file ? path.relative(root, d.file.fileName) : '?'}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);

    return {
      root,
      diagnostics,
      read: (file) => fs.readFileSync(path.join(root, 'out', file), 'utf8'),
      exists: (file) => fs.existsSync(path.join(root, 'out', file)),
    };
  }

  return { generateAndCompile, cleanup: () => fs.rmSync(cacheRoot, { recursive: true, force: true }) };
}
