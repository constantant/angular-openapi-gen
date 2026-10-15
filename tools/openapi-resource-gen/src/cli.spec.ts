import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadSchema, parseArgs, runCli } from './cli';

const schema = loadSchema();

describe('parseArgs', () => {
  it('reads --key value and --key=value', () => {
    const { options } = parseArgs(['--specPath', 'a.json', '--outputDir=out', '--providedIn', 'root'], schema);
    expect(options).toEqual({ specPath: 'a.json', outputDir: 'out', providedIn: 'root' });
  });

  it('treats the first positional argument as specPath', () => {
    expect(parseArgs(['spec.yaml', '--outputDir', 'out'], schema).options['specPath']).toBe('spec.yaml');
  });

  it('supports --flag, --flag=false, --flag false and --no-flag for booleans', () => {
    expect(parseArgs(['--includeMocks'], schema).options['includeMocks']).toBe(true);
    expect(parseArgs(['--includeMocks=false'], schema).options['includeMocks']).toBe(false);
    expect(parseArgs(['--includeMocks', 'false'], schema).options['includeMocks']).toBe(false);
    expect(parseArgs(['--no-includeMocks'], schema).options['includeMocks']).toBe(false);
  });

  it('rejects unknown options, bad enum values and missing values', () => {
    expect(() => parseArgs(['--nope'], schema)).toThrow(/Unknown option --nope/);
    expect(() => parseArgs(['--providedIn', 'sometimes'], schema)).toThrow(/must be one of/);
    expect(() => parseArgs(['--outputDir'], schema)).toThrow(/needs a value/);
  });

  it('rejects extra positional arguments', () => {
    expect(() => parseArgs(['a.json', 'b.json'], schema)).toThrow(/Unexpected argument "b.json"/);
  });
});

describe('runCli', () => {
  const dirs: string[] = [];
  afterEach(() => {
    vi.restoreAllMocks();
    for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true });
  });

  it('fails when a required option is missing', async () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(await runCli(['--outputDir', 'out'], os.tmpdir())).toBe(1);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('--specPath'));
  });

  it('generates token files into the working directory', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'oarg-cli-'));
    dirs.push(cwd);
    fs.writeFileSync(
      path.join(cwd, 'spec.json'),
      JSON.stringify({
        openapi: '3.0.0',
        info: { title: 't', version: '1' },
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              responses: { '200': { description: 'ok', content: { 'application/json': { schema: { type: 'array', items: { type: 'string' } } } } } },
            },
          },
        },
      }),
    );
    const code = await runCli([path.join(cwd, 'spec.json'), '--outputDir', 'out', '--baseUrlToken', 'PETS_BASE_URL'], cwd);
    expect(code).toBe(0);
    expect(fs.existsSync(path.join(cwd, 'out', 'pets', 'list-pets.token.ts'))).toBe(true);
    expect(fs.readFileSync(path.join(cwd, 'out', 'api-base-url.token.ts'), 'utf8')).toContain('PETS_BASE_URL');
  });
});
