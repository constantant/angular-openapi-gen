// @vitest-environment node
/**
 * The Playwright helper against a real Chromium: a plain page (no Angular, no mock build) on a local
 * server that would answer every API request itself with 599, so a 599 means a request escaped the
 * mocks. Covers endpoints from an ENDPOINTS-shaped object, defaults, behaviors set before and after
 * the page loaded, history across a reload, headers, strict mode and the coverage record.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as http from 'http';
import type { AddressInfo } from 'net';
import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { installOpenApiMocks } from './playwright';

const ENDPOINTS = {
  GET_PET: { key: 'GET_PET', specId: 'pets', operationId: 'getPet', method: 'get', path: '/pets/{id}', responseType: 'json' },
  ADD_PET: { key: 'ADD_PET', specId: 'pets', operationId: 'addPet', method: 'post', path: '/pets', responseType: 'json' },
  LIST_PETS: { key: 'LIST_PETS', specId: 'pets', operationId: 'listPets', method: 'get', path: '/pets', responseType: 'json' },
} as const;

interface EndpointResponses {
  GET_PET: { id: string; name: string };
  ADD_PET: { id: string; name: string };
  LIST_PETS: Array<{ id: string; name: string }>;
}
interface EndpointErrors {
  GET_PET: { '404': { title: string } };
  ADD_PET: { '400': Array<{ code: string }> };
  LIST_PETS: Record<never, never>;
}

// The page asks for a pet as soon as it loads, before any test code runs in it.
const PAGE = `<!doctype html><title>t</title><script>
  window.first = fetch('/api/pets/1?lang=it').then(async (r) => ({ status: r.status, body: await r.json() }));
</script>`;

let server: http.Server;
let origin: string;
let browser: Browser;

beforeAll(async () => {
  server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/other') {
      res.setHeader('content-type', 'text/html');
      return res.end(PAGE);
    }
    res.statusCode = 599;
    res.end('"real"');
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  origin = `http://localhost:${(server.address() as AddressInfo).port}`;
  browser = await chromium.launch();
}, 60_000);

afterAll(async () => {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
});

async function setup(options: Partial<Parameters<typeof installOpenApiMocks>[1]> = {}): Promise<{
  context: BrowserContext;
  page: Page;
  api: Awaited<ReturnType<typeof installOpenApiMocks<EndpointResponses, EndpointErrors>>>;
}> {
  const context = await browser.newContext({ baseURL: origin });
  const api = await installOpenApiMocks<EndpointResponses, EndpointErrors>(context, {
    baseUrl: '/api',
    endpoints: ENDPOINTS,
    defaults: { GET_PET: { value: { id: '1', name: 'Default' } } },
    strict: true,
    timeoutMs: 3000,
    ...options,
  });
  const page = await context.newPage();
  return { context, page, api };
}

const call = (page: Page, url: string, init?: RequestInit) =>
  page.evaluate(
    async ({ url, init }) => {
      const r = await fetch(url, init);
      return { status: r.status, body: r.status === 204 ? null : await r.json() };
    },
    { url, init },
  );

describe('installOpenApiMocks', () => {
  it('answers the very first request of a page with the default, and records it', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    expect(await page.evaluate(() => (window as unknown as { first: Promise<unknown> }).first)).toEqual({
      status: 200,
      body: { id: '1', name: 'Default' },
    });
    await api.endpoint('GET_PET').expectCalledWith('1', { lang: 'it' });
    await context.close();
  }, 30_000);

  it('applies a behavior in an open page and keeps it for the next page load', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    await api.endpoint('GET_PET').resolve({ id: '2', name: 'Rex' });
    expect(await call(page, '/api/pets/2')).toEqual({ status: 200, body: { id: '2', name: 'Rex' } });

    await api.endpoint('GET_PET').fail('404', { title: 'gone' });
    await page.reload();
    expect(await page.evaluate(() => (window as unknown as { first: Promise<unknown> }).first)).toEqual({
      status: 404,
      body: { title: 'gone' },
    });

    await api.endpoint('GET_PET').reset();
    expect((await call(page, '/api/pets/3')).body).toEqual({ id: '1', name: 'Default' });
    // History survives the reload: the load, the call, the reloaded load, the call after reset.
    expect(api.endpoint('GET_PET').calls).toEqual([['1', { lang: 'it' }], ['2'], ['1', { lang: 'it' }], ['3']]);
    await context.close();
  }, 30_000);

  it('records bodies and headers, and waits for a request still to come', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    const add = api.endpoint('ADD_PET');
    await add.fail('400', [{ code: 'NameTaken' }]);
    const waiting = add.waitForRequest((r) => r.headers['authorization'] === 'Bearer t');
    const res = await call(page, '/api/pets', {
      method: 'POST',
      headers: { Authorization: 'Bearer t', 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Rex' }),
    });
    expect(res).toEqual({ status: 400, body: [{ code: 'NameTaken' }] });
    const request = await waiting;
    expect(request).toMatchObject({ method: 'POST', args: [{ name: 'Rex' }], headers: { authorization: 'Bearer t' } });
    await expect(add.expectCalledWith({ name: 'Other' })).rejects.toThrow(
      'ADD_PET was not requested with [{"name":"Other"}] within 3000 ms; it received [{"name":"Rex"}].',
    );
    await context.close();
  }, 30_000);

  it('refuses in strict mode what no mock answers, and reports it', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    expect((await call(page, '/api/orders')).status).toBe(501);
    // LIST_PETS is registered but has no behavior.
    expect((await call(page, '/api/pets')).status).toBe(501);
    // Outside /api the page's own server answers (599 here), as for a real asset.
    expect((await call(page, '/assets/x.json')).status).toBe(599);
    await expect.poll(() => api.unmatched.length).toBe(2);
    expect(() => api.expectNoUnmatched()).toThrow(/GET .*\/api\/orders\n.*GET .*\/api\/pets \(LIST_PETS has no behavior\)/);
    await context.close();
  }, 30_000);

  it('passes unmocked requests through when strict mode is off', async () => {
    const { context, page } = await setup({ strict: false });
    await page.goto('/');
    expect((await call(page, '/api/orders')).status).toBe(599);
    await context.close();
  }, 30_000);

  it('reports coverage: requests, served statuses and asserted inputs', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    await api.endpoint('GET_PET').expectCalledWith('1', { lang: 'it' });
    await api.endpoint('GET_PET').fail('404', { title: 'gone' });
    await call(page, '/api/pets/9');
    await api.endpoint('LIST_PETS').resolve([]);
    await call(page, '/api/pets');
    await expect.poll(() => api.coverage().find((c) => c.key === 'GET_PET')?.served).toEqual([200, 404]);
    expect(api.coverage()).toEqual([
      { key: 'GET_PET', requests: 2, served: [200, 404], inputsAsserted: true },
      { key: 'ADD_PET', requests: 0, served: [], inputsAsserted: false },
      { key: 'LIST_PETS', requests: 1, served: [200], inputsAsserted: false },
    ]);
    await context.close();
  }, 30_000);

  it('answers different requests of one endpoint differently with when(), across page loads, until reset()', async () => {
    const { context, page, api } = await setup();
    const getPet = api.endpoint('GET_PET');
    await getPet.when({ path: ['1'] }).resolve({ id: '1', name: 'Rex' }); // the page's first request
    await getPet.when({ path: ['2'] }).fail('404', { title: 'gone' });
    await page.goto('/');
    expect(await page.evaluate(() => (window as unknown as { first: Promise<unknown> }).first)).toEqual({
      status: 200,
      body: { id: '1', name: 'Rex' },
    });
    expect(await call(page, '/api/pets/2')).toEqual({ status: 404, body: { title: 'gone' } });
    // others get the endpoint's own behavior (the default here)
    expect((await call(page, '/api/pets/3')).body).toEqual({ id: '1', name: 'Default' });

    // a case set again replaces the one for the same match, in the open page and after a reload
    await getPet.when({ path: ['2'] }).resolve({ id: '2', name: 'Luna' });
    expect((await call(page, '/api/pets/2')).body).toEqual({ id: '2', name: 'Luna' });
    await page.reload();
    expect((await call(page, '/api/pets/2')).body).toEqual({ id: '2', name: 'Luna' });

    await getPet.reset();
    expect((await call(page, '/api/pets/2')).body).toEqual({ id: '1', name: 'Default' });
    await context.close();
  }, 30_000);

  it('answers in turn with sequence(): a failure, then the data', async () => {
    const { context, page, api } = await setup();
    await page.goto('/');
    await api.endpoint('ADD_PET').sequence([{ error: { title: 'busy' }, status: 503 }, { value: { id: '9', name: 'Rex' } }]);
    const post = () => call(page, '/api/pets', { method: 'POST', body: JSON.stringify({ name: 'Rex' }) });
    expect(await post()).toEqual({ status: 503, body: { title: 'busy' } });
    expect(await post()).toEqual({ status: 200, body: { id: '9', name: 'Rex' } });
    expect(await post()).toEqual({ status: 200, body: { id: '9', name: 'Rex' } });
    await context.close();
  }, 30_000);

  it('rejects keys that are not among the endpoints', async () => {
    const { context, api } = await setup();
    expect(() => api.endpoint('NOPE' as 'GET_PET')).toThrow('"NOPE" is not one of the endpoints given to installOpenApiMocks.');
    await context.close();
  }, 30_000);
});
