#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
// FsTree, flushChanges, printChanges are not re-exported from @nx/devkit — same internal path
// the executor uses. The CLI never touches the Nx project graph, so it also runs where Nx's
// native module is unavailable (e.g. StackBlitz WebContainers).
const { FsTree, flushChanges, printChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');
import { apiResourceGenerator, ApiResourceGeneratorSchema } from './generators/api-resource/generator';

interface OptionSpec {
  type: 'string' | 'boolean';
  description?: string;
  enum?: string[];
  default?: string | boolean;
  $default?: unknown;
}

interface SchemaJson {
  properties: Record<string, OptionSpec>;
  required?: string[];
}

export function loadSchema(): SchemaJson {
  const file = path.join(__dirname, 'generators', 'api-resource', 'schema.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as SchemaJson;
}

export function parseArgs(argv: string[], schema: SchemaJson): { options: Record<string, string | boolean>; help: boolean } {
  const props = schema.properties;
  const options: Record<string, string | boolean> = {};
  let help = false;
  const positionals: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      help = true;
      continue;
    }
    if (!arg.startsWith('--')) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf('=');
    let name = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
    let inline: string | undefined = eq === -1 ? undefined : arg.slice(eq + 1);
    let negated = false;
    if (!(name in props) && name.startsWith('no-') && props[name.slice(3)]?.type === 'boolean') {
      name = name.slice(3);
      negated = true;
    }
    const spec = props[name];
    if (!spec) throw new Error(`Unknown option --${name}. Run with --help to list the options.`);
    if (spec.type === 'boolean') {
      if (inline === undefined && argv[i + 1] !== undefined && /^(true|false)$/.test(argv[i + 1])) inline = argv[++i];
      if (inline !== undefined && !/^(true|false)$/.test(inline)) throw new Error(`--${name} expects true or false, got "${inline}".`);
      options[name] = negated ? false : inline === undefined ? true : inline === 'true';
    } else {
      const value = inline ?? argv[++i];
      if (value === undefined) throw new Error(`--${name} needs a value.`);
      if (spec.enum && !spec.enum.includes(value)) throw new Error(`--${name} must be one of: ${spec.enum.join(', ')} (got "${value}").`);
      options[name] = value;
    }
  }

  // The first positional argument is the spec path, as with the Nx generator.
  if (positionals.length > 0 && options['specPath'] === undefined) options['specPath'] = positionals.shift() as string;
  if (positionals.length > 0) throw new Error(`Unexpected argument "${positionals[0]}".`);
  return { options, help };
}

export function helpText(schema: SchemaJson): string {
  const lines = ['Usage: openapi-resource-gen <specPath> --outputDir <dir> [options]', '', 'Options:'];
  for (const [name, spec] of Object.entries(schema.properties)) {
    const flags = spec.type === 'boolean' ? `--${name}` : `--${name} <${spec.enum ? spec.enum.join('|') : 'value'}>`;
    const def = spec.default !== undefined ? ` (default: ${String(spec.default)})` : '';
    const req = schema.required?.includes(name) ? ' [required]' : '';
    lines.push(`  ${flags}${req}`, `      ${spec.description ?? ''}${def}`);
  }
  lines.push('', '  Booleans accept --flag, --flag=false or --no-flag.', '  -h, --help');
  return lines.join('\n');
}

/** Runs the generator against `cwd` and returns the process exit code. */
export async function runCli(argv: string[], cwd: string = process.cwd()): Promise<number> {
  try {
    const schema = loadSchema();
    const { options, help } = parseArgs(argv, schema);
    if (help) {
      console.log(helpText(schema));
      return 0;
    }
    for (const name of schema.required ?? []) {
      if (options[name] === undefined) throw new Error(`Missing required option --${name}. Run with --help to list the options.`);
    }
    const tree = new FsTree(cwd, false);
    await apiResourceGenerator(tree, options as unknown as ApiResourceGeneratorSchema);
    const changes = tree.listChanges();
    flushChanges(cwd, changes);
    printChanges(changes);
    return 0;
  } catch (e) {
    console.error((e as Error).message ?? String(e));
    return 1;
  }
}

if (require.main === module) {
  runCli(process.argv.slice(2)).then((code) => process.exit(code));
}
