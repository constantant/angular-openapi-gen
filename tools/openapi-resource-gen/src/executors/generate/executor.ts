import { ExecutorContext } from '@nx/devkit';
// FsTree, flushChanges, printChanges are not re-exported from @nx/devkit —
// import from the stable internal path (consistent across Nx 22+).
const { FsTree, flushChanges, printChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');
import {
  apiResourceGenerator,
  ApiResourceGeneratorSchema,
} from '../../generators/api-resource/generator';

/** `check` writes nothing and fails when the generated output is out of date (for CI). */
export type GenerateExecutorSchema = ApiResourceGeneratorSchema & { check?: boolean };

export default async function generateExecutor(
  options: GenerateExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    const tree = new FsTree(context.root, context.isVerbose ?? false);
    await apiResourceGenerator(tree, options);
    const changes = tree.listChanges();
    if (options.check) {
      for (const c of changes) console.log(`${c.type === 'CREATE' ? '+' : c.type === 'DELETE' ? '-' : '~'} ${c.path}`);
      if (changes.length > 0) console.error(`${changes.length} generated file(s) are out of date. Regenerate them.`);
      return { success: changes.length === 0 };
    }
    flushChanges(context.root, changes);
    printChanges(changes);
    return { success: true };
  } catch (e) {
    console.error((e as Error).message ?? String(e));
    return { success: false };
  }
}
