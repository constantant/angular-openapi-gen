// The real generator, real parser, real FsTree + flushChanges (what the executor does), on the
// real petstore spec. The unit tests mock the parser, so this is what exercises the Nx APIs.
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { apiResourceGenerator } from './src/generators/api-resource/generator';

const { FsTree, flushChanges, printChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');

describe('generator end to end (real petstore spec)', () => {
  it("the executor's internal imports resolve", () => {
    expect(typeof FsTree).toBe('function');
    expect(typeof flushChanges).toBe('function');
    expect(typeof printChanges).toBe('function');
  });

  it('generates tokens, formats them with prettier and flushes them to disk', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'nxcompat-'));
    fs.copyFileSync(path.join(__dirname, 'specs/petstore.yaml'), path.join(root, 'petstore.yaml'));
    fs.writeFileSync(path.join(root, 'tsconfig.base.json'), JSON.stringify({ compilerOptions: { paths: {} } }));
    fs.writeFileSync(path.join(root, '.prettierrc'), JSON.stringify({ singleQuote: true }));
    fs.writeFileSync(path.join(root, 'package.json'), '{"name":"ws"}');
    const previous = process.cwd();
    process.chdir(root);
    try {
      const tree = new FsTree(root, false);
      await apiResourceGenerator(tree, {
        specPath: 'petstore.yaml',
        outputDir: 'libs/pets/src',
        baseUrlToken: 'PETSTORE_BASE_URL',
        validateResponses: true,
        httpClientTags: 'store',
      } as never);
      flushChanges(root, tree.listChanges());
    } finally {
      process.chdir(previous);
    }
    const out = (p: string) => fs.readFileSync(path.join(root, 'libs/pets/src', p), 'utf8');
    expect(fs.existsSync(path.join(root, 'libs/pets/src/schema.d.ts'))).toBe(true);
    expect(out('pet/find-pets-by-status.token.ts')).toContain('httpResource');
    expect(out('store/get-inventory.token.ts')).toContain('HttpClient');
    expect(out('index.ts')).toContain("export * from './pet'");
  });
});
