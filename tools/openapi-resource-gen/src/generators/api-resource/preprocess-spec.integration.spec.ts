/**
 * Integration test for the spec preprocessing options (overlay, stripPathPrefix, include/exclude
 * operations, excludeSecuritySchemes): the real generator and parser run on a spec shaped like an
 * ASP.NET Swashbuckle one (no operationIds, an /api prefix, alternative security schemes, a 200
 * without a schema), and the output is compiled with the TypeScript compiler.
 */
import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect, afterAll } from 'vitest';
import { integrationWorkspace } from './integration-helpers';

const SPEC = JSON.stringify({
  openapi: '3.0.1',
  info: { title: 'Bonds', version: '1' },
  security: [{ Bearer: [], Google: ['openid'] }, { ApiKey: [] }],
  components: {
    securitySchemes: {
      Bearer: { type: 'http', scheme: 'Bearer' },
      Google: {
        type: 'oauth2',
        flows: { authorizationCode: { authorizationUrl: 'https://a.test', tokenUrl: 'https://t.test', scopes: { openid: 'OpenID' } } },
      },
      ApiKey: { type: 'apiKey', in: 'header', name: 'X-Api-Key' },
    },
    schemas: { Bond: { type: 'object', required: ['isin'], properties: { isin: { type: 'string' } } } },
  },
  paths: {
    '/api/bonds/{isin}': {
      get: {
        tags: ['Bonds'],
        parameters: [{ name: 'isin', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'ok', content: { 'application/json': { schema: { $ref: '#/components/schemas/Bond' } } } } },
      },
    },
    '/api/token/exchange': {
      post: {
        tags: ['Token'],
        requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { code: { type: 'string' } } } } } },
        // The API returns a body here, but the spec does not say so; the overlay fixes it.
        responses: { '200': { description: 'ok' } },
      },
    },
    '/sitemap.xml': { get: { tags: ['Sitemap'], responses: { '200': { description: 'ok' } } } },
  },
});

const OVERLAY = `overlay: 1.0.0
info: { title: fixes, version: 1.0.0 }
actions:
  - target: "$.paths['/api/token/exchange'].post"
    update:
      operationId: exchangeToken
      responses:
        '200':
          content:
            application/json:
              schema: { type: object, properties: { accessToken: { type: string, nullable: true } } }
`;

const { generateAndCompile, cleanup } = integrationWorkspace('oas-preprocess-integration');
afterAll(cleanup);

describe('spec preprocessing on a Swashbuckle-style spec', () => {
  it('renames, filters, fixes and drops schemes before generating, and the output compiles', async () => {
    const ws = await generateAndCompile(
      'all',
      { fileName: 'api.json', text: SPEC },
      {
        overlay: 'fixes.overlay.yaml',
        stripPathPrefix: '/api',
        excludeOperations: 'GET /sitemap.xml',
        excludeSecuritySchemes: '*',
        clientType: 'httpClient',
        providedIn: 'root',
      },
      `import { GET_BONDS_ISIN, EXCHANGE_TOKEN, type ExchangeTokenResponse } from './out';
       import { inject } from '@angular/core';
       export const probe = () => [inject(GET_BONDS_ISIN)('X'), inject(EXCHANGE_TOKEN)({ code: 'c' })];
       const token: string | null | undefined = ({} as ExchangeTokenResponse).accessToken;
       export { token };`,
      (root) => fs.writeFileSync(path.join(root, 'fixes.overlay.yaml'), OVERLAY),
    );

    expect(ws.diagnostics).toEqual([]);
    // Derived name without the /api prefix; the overlay's operationId wins over derivation.
    expect(ws.exists('bonds/get-bonds-isin.token.ts')).toBe(true);
    expect(ws.exists('token/exchange-token.token.ts')).toBe(true);
    // Excluded operation, and its now empty tag folder, are not generated.
    expect(ws.exists('sitemap')).toBe(false);
    // No security tokens, and no token reads credentials.
    expect(ws.exists('api-key.security-token.ts')).toBe(false);
    const bond = ws.read('bonds/get-bonds-isin.token.ts');
    expect(bond).not.toMatch(/X-Api-Key|Authorization|security-token/);
    // The overlay's response schema reached schema.d.ts and the token's response type.
    expect(ws.read('token/exchange-token.token.ts')).toContain('Observable<ExchangeTokenResponse>');
  }, 120_000);

  it('reports an overlay target that no longer matches', async () => {
    await expect(
      generateAndCompile(
        'stale',
        { fileName: 'api.json', text: SPEC },
        { overlay: 'stale.overlay.yaml' },
        '',
        (root) =>
          fs.writeFileSync(
            path.join(root, 'stale.overlay.yaml'),
            `overlay: 1.0.0\nactions:\n  - target: "$.paths['/api/gone'].get"\n    remove: true\n`,
          ),
      ),
    ).rejects.toThrow(`Overlay "stale.overlay.yaml", action 1: target "$.paths['/api/gone'].get" matches nothing in the spec.`);
  }, 120_000);
});
