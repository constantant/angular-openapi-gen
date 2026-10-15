import type { Tree } from '@nx/devkit';
import * as path from 'path';

const FORMATTABLE = /\.(ts|json)$/;

/**
 * Formats the files changed in `tree` with prettier, without touching Nx internals.
 *
 * devkit's `formatFiles` walks the tree with Nx's native ignore checker, which is missing when Nx
 * falls back to its WASM build (StackBlitz WebContainers). This is the fallback for that case. It
 * does nothing when prettier isn't installed.
 */
export async function formatChangedFiles(tree: Tree): Promise<void> {
  let prettier: typeof import('prettier');
  try {
    prettier = require('prettier');
  } catch {
    return;
  }
  await Promise.all(
    tree
      .listChanges()
      .filter((c) => c.type !== 'DELETE' && FORMATTABLE.test(c.path) && c.content)
      .map(async (change) => {
        const systemPath = path.join(tree.root, change.path);
        try {
          const options = await prettier.resolveConfig(systemPath, { editorconfig: true });
          const formatted = await prettier.format(change.content!.toString('utf-8'), { ...options, filepath: systemPath });
          tree.write(change.path, formatted);
        } catch {
          // Leave the file as generated if it can't be formatted.
        }
      }),
  );
}
