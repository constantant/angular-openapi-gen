import { ExecutorContext } from '@nx/devkit';
// FsTree, flushChanges, printChanges are not re-exported from @nx/devkit —
// import from the stable internal path (consistent across Nx 22+).
const { FsTree, flushChanges, printChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');
import {
  apiResourceGenerator,
  ApiResourceGeneratorSchema,
} from '../../generators/api-resource/generator';

export type GenerateExecutorSchema = ApiResourceGeneratorSchema;

export default async function generateExecutor(
  options: GenerateExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    const tree = new FsTree(context.root, context.isVerbose ?? false);
    await apiResourceGenerator(tree, options);
    const changes = tree.listChanges();
    flushChanges(context.root, changes);
    printChanges(changes);
    return { success: true };
  } catch (e) {
    console.error((e as Error).message ?? String(e));
    return { success: false };
  }
}
