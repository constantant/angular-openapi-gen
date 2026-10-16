import { describe, it, expect } from 'vitest';
import {
  parseServerVariables,
  renderBaseUrlFile,
  renderServerVariablesFile,
} from './render-server-variables';

const servers = [
  {
    url: 'https://{region}.example.com/{basePath}',
    variables: {
      region: { default: 'us', enum: ['us', 'eu'] },
      basePath: { default: 'v1' },
      unused: { default: 'x' },
    },
  },
];

describe('server variables', () => {
  it('ignores specs without templated servers', () => {
    expect(parseServerVariables(undefined, 'API_BASE_URL')).toBeUndefined();
    expect(
      parseServerVariables([{ url: 'https://a.com' }], 'API_BASE_URL'),
    ).toBeUndefined();
    expect(
      parseServerVariables(
        [{ url: 'https://a.com', variables: { x: { default: '1' } } }],
        'API_BASE_URL',
      ),
    ).toBeUndefined();
  });

  it('names tokens from the base URL token and skips unreferenced variables', () => {
    const m = parseServerVariables(servers, 'PETS_BASE_URL')!;
    expect(m.variables.map((v) => v.tokenName)).toEqual([
      'PETS_REGION',
      'PETS_BASE_PATH',
    ]);
  });

  it('renders typed tokens with spec defaults', () => {
    const out = renderServerVariablesFile(
      parseServerVariables(servers, 'API_BASE_URL')!,
    );
    expect(out).toContain(`new InjectionToken<"us" | "eu">(`);
    expect(out).toContain(`factory: () => "us"`);
    expect(out).toContain('new InjectionToken<string>(');
  });

  it('builds the base URL from the tokens', () => {
    const out = renderBaseUrlFile(
      'API_BASE_URL',
      parseServerVariables(servers, 'API_BASE_URL')!,
    );
    expect(out).toContain(
      'factory: () => `https://${inject(API_REGION)}.example.com/${inject(API_BASE_PATH)}`',
    );
    expect(out).toContain("from './server-variables.token'");
  });

  it('keeps the empty default without variables', () => {
    expect(renderBaseUrlFile('API_BASE_URL')).toContain("factory: () => ''");
  });
});
