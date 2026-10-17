import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { installMockInterception, uninstallMockInterception } from './install';
import type { MockRuntime } from './mock-runtime';
import { compileEndpointRule } from './url-matcher';
import type { MockEvent } from '../mock-events';

const BASE = 'https://api.example.com/v2';

describe('compileEndpointRule', () => {
  it('matches method, origin, base path and template, extracting path params and query', () => {
    const m = compileEndpointRule({ method: 'get', baseUrl: BASE, path: '/pet/{petId}/photo/{photoId}' });
    expect(m.match('GET', `${BASE}/pet/4%202/photo/7?size=s&tag=a&tag=b#x`)).toEqual({
      pathParams: ['4 2', '7'],
      query: { size: 's', tag: ['a', 'b'] },
    });
    expect(m.match('POST', `${BASE}/pet/42/photo/7`)).toBeNull();
    expect(m.match('GET', 'https://other.example.com/v2/pet/42/photo/7')).toBeNull();
    expect(m.match('GET', `${BASE}/pet/42/photo/7/extra`)).toBeNull();
    expect(m.match('GET', 'https://api.example.com/pet/42/photo/7')).toBeNull();
  });

  it('resolves a relative base URL against the page', () => {
    const m = compileEndpointRule({ method: 'GET', baseUrl: '/api', path: '/pets' });
    expect(m.match('GET', '/api/pets')).not.toBeNull();
    expect(m.match('GET', `${location.origin}/api/pets/`)).not.toBeNull();
    expect(m.match('GET', '/pets')).toBeNull();
  });

  it('ranks literal segments above placeholders', () => {
    const literal = compileEndpointRule({ method: 'GET', baseUrl: BASE, path: '/pet/findByStatus' });
    const param = compileEndpointRule({ method: 'GET', baseUrl: BASE, path: '/pet/{petId}' });
    expect(literal.specificity).toBeGreaterThan(param.specificity);
  });
});

describe('mock interception', () => {
  let nativeFetch: ReturnType<typeof vi.fn>;
  let originalFetch: typeof fetch;
  let runtime: MockRuntime;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    nativeFetch = vi.fn(async () => new Response('"real"', { status: 200 }));
    globalThis.fetch = nativeFetch as unknown as typeof fetch;
    runtime = installMockInterception();
  });

  afterEach(() => {
    uninstallMockInterception();
    globalThis.fetch = originalFetch;
    vi.useRealTimers();
  });

  const entry = (key: string) => window.__openApiMocks__![key];

  describe('fetch', () => {
    it('answers a mocked endpoint without calling the native fetch', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [{ id: 1 }] } });
      const res = await fetch(`${BASE}/pets?limit=5`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toBe('application/json');
      expect(res.url).toBe(`${BASE}/pets?limit=5`);
      expect(await res.json()).toEqual([{ id: 1 }]);
      expect(nativeFetch).not.toHaveBeenCalled();
    });

    it('passes through requests that match no endpoint', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [] } });
      const res = await fetch(`${BASE}/owners`);
      expect(await res.json()).toBe('real');
      expect(nativeFetch).toHaveBeenCalledTimes(1);
    });

    it('passes through a registered endpoint that has no behavior, but records the request', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });
      await fetch(`${BASE}/pets`);
      expect(nativeFetch).toHaveBeenCalledTimes(1);
      expect(entry('LIST').getState().requestCount).toBe(1);
    });

    it('sends an error behavior as a failing response', async () => {
      runtime.register('GET', { method: 'get', baseUrl: BASE, path: '/pets/{id}' }, {
        behavior: { error: { message: 'nope' }, status: 404 },
      });
      const res = await fetch(`${BASE}/pets/1`);
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ message: 'nope' });
    });

    it('answers 204 with no body for an undefined value', async () => {
      runtime.register('DEL', { method: 'delete', baseUrl: BASE, path: '/pets/{id}' }, { behavior: { value: undefined } });
      const res = await fetch(`${BASE}/pets/1`, { method: 'DELETE' });
      expect(res.status).toBe(204);
      expect(await res.text()).toBe('');
    });

    it('prefers the more specific endpoint', async () => {
      runtime.register('BY_ID', { method: 'get', baseUrl: BASE, path: '/pet/{petId}' }, { behavior: { value: 'by-id' } });
      runtime.register('BY_STATUS', { method: 'get', baseUrl: BASE, path: '/pet/findByStatus' }, {
        behavior: { value: 'by-status' },
      });
      runtime.register('BY_ID_AGAIN', { method: 'get', baseUrl: BASE, path: '/pet/{id}' });
      expect(await (await fetch(`${BASE}/pet/findByStatus`)).json()).toBe('by-status');
    });

    it('sends a string as JSON, or raw when the endpoint is declared as text', async () => {
      runtime.register('JSON', { method: 'get', baseUrl: BASE, path: '/login' }, { behavior: { value: 'token' } });
      runtime.register('TEXT', { method: 'get', baseUrl: BASE, path: '/motd' }, {
        behavior: { value: 'hello' },
        meta: { specId: 's', operationId: 'motd', path: '/motd', method: 'get', responseType: 'text' },
      });
      const json = await fetch(`${BASE}/login`);
      expect(json.headers.get('content-type')).toBe('application/json');
      expect(await json.text()).toBe('"token"');
      const text = await fetch(`${BASE}/motd`);
      expect(text.headers.get('content-type')).toBe('text/plain');
      expect(await text.text()).toBe('hello');
    });

    it('honours delay', async () => {
      vi.useFakeTimers();
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [], delay: 300 } });
      let done = false;
      const promise = fetch(`${BASE}/pets`).then(() => (done = true));
      await vi.advanceTimersByTimeAsync(299);
      expect(done).toBe(false);
      expect(entry('LIST').getState().status).toBe('loading');
      await vi.advanceTimersByTimeAsync(1);
      await promise;
      expect(done).toBe(true);
      expect(entry('LIST').getState().status).toBe('resolved');
    });

    it('rejects with an AbortError when aborted while held', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { loading: true } });
      const controller = new AbortController();
      const promise = fetch(`${BASE}/pets`, { signal: controller.signal });
      controller.abort();
      await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    });

    it('records path params, body and query as request args', async () => {
      runtime.register('UPDATE', { method: 'put', baseUrl: BASE, path: '/pets/{id}' }, { behavior: { value: {} } });
      await fetch(`${BASE}/pets/9?dryRun=true`, { method: 'PUT', body: JSON.stringify({ name: 'Rex' }) });
      const [request] = entry('UPDATE').getHistory() as Extract<MockEvent, { type: 'request' }>[];
      expect(request.args).toEqual(['9', { name: 'Rex' }, { dryRun: 'true' }]);
    });
  });

  describe('controls', () => {
    it('resolve() answers held requests and all later ones', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { loading: true } });
      const held = fetch(`${BASE}/pets`);
      entry('LIST').resolve(['a']);
      expect(await (await held).json()).toEqual(['a']);
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['a']);
    });

    it('fail() answers with a 500 carrying the error', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [] } });
      entry('LIST').fail({ reason: 'boom' });
      const res = await fetch(`${BASE}/pets`);
      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ reason: 'boom' });
      expect(entry('LIST').getState().status).toBe('error');
    });

    it('reset() returns to the initial behavior', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: ['initial'] } });
      entry('LIST').resolve(['override']);
      entry('LIST').reset();
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['initial']);
    });

    it('reset() releases held requests to the real API when there is no initial behavior', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });
      entry('LIST').setLoading();
      const held = fetch(`${BASE}/pets`);
      entry('LIST').reset();
      expect(await (await held).json()).toBe('real');
    });

    it('catch mode holds the request and emits a caught event until resolved', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: ['initial'] } });
      entry('LIST').setCatchMode(true);
      const events: string[] = [];
      entry('LIST').onEvent((e) => events.push(e.type));
      const held = fetch(`${BASE}/pets`);
      expect(events).toEqual(['request', 'caught']);
      entry('LIST').resolve(['caught']);
      expect(await (await held).json()).toEqual(['caught']);
    });

    it('reads catch modes pre-injected by the extension', async () => {
      uninstallMockInterception();
      (window as unknown as Record<string, unknown>)['__oarmPendingCatch__'] = { LIST: true };
      runtime = installMockInterception();
      expect(runtime.isCatchMode('LIST')).toBe(true);
      expect((window as unknown as Record<string, unknown>)['__oarmPendingCatch__']).toBeUndefined();
    });

    it('is driven by openapi-mock-control DOM events, including registering an endpoint', async () => {
      const control = (detail: Record<string, unknown>): boolean =>
        document.dispatchEvent(new CustomEvent('openapi-mock-control', { detail }));
      control({ key: 'LOCAL', action: 'register', rule: { method: 'get', baseUrl: BASE, path: '/pets' } });
      control({ key: 'LOCAL', action: 'resolve', value: ['from-panel'] });
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['from-panel']);
      control({ key: 'LOCAL', action: 'unregister' });
      expect(await (await fetch(`${BASE}/pets`)).json()).toBe('real');
    });

    it('hold() parks requests until configure() registers the endpoints', async () => {
      runtime.hold(5000);
      let answered = false;
      const early = fetch(`${BASE}/pets`).then((res) => {
        answered = true;
        return res.json();
      });
      const untouched = fetch(`${BASE}/owners`).then((res) => res.json());
      await Promise.resolve();
      expect(answered).toBe(false);
      expect(nativeFetch).not.toHaveBeenCalled();

      runtime.configure({
        endpoints: [{ key: 'LIST', rule: { method: 'get', baseUrl: BASE, path: '/pets' }, behavior: { value: ['configured'] } }],
        catchModes: { OTHER: true },
      });
      expect(await early).toEqual(['configured']);
      expect(await untouched).toBe('real');
      expect(runtime.isCatchMode('OTHER')).toBe(true);
      // What the tool set is an override: reset() hands the endpoint back to the real API.
      entry('LIST').reset();
      expect(await (await fetch(`${BASE}/pets`)).json()).toBe('real');
    });

    it('switching catch mode off lets a held request continue with the endpoint behavior', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: ['configured'] } });
      runtime.register('OWNERS', { method: 'get', baseUrl: BASE, path: '/owners' });
      runtime.setCatchMode('LIST', true);
      runtime.setCatchMode('OWNERS', true);
      const mocked = fetch(`${BASE}/pets?status=sold`).then((res) => res.json());
      const unmocked = fetch(`${BASE}/owners`).then((res) => res.json());
      await Promise.resolve();
      expect(entry('LIST').getState().caught?.args).toEqual([{ status: 'sold' }]);

      runtime.setCatchMode('LIST', false);
      runtime.setCatchMode('OWNERS', false);
      expect(await mocked).toEqual(['configured']);
      expect(await unmocked).toBe('real'); // no behavior: released to the real API
      expect(entry('LIST').getState().caught).toBeUndefined();
    });

    it('keeps the real JSON response of an unmocked endpoint as its state and reports a real event', async () => {
      const json = (value: unknown, status = 200): Response =>
        new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json' } });
      nativeFetch.mockImplementation(async () => json([{ id: 1, name: 'Real Rex' }]));
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });

      const response = await fetch(`${BASE}/pets`);
      expect(await response.json()).toEqual([{ id: 1, name: 'Real Rex' }]); // the caller's body is untouched
      await vi.waitFor(() => expect(entry('LIST').getState().value).toEqual([{ id: 1, name: 'Real Rex' }]));
      expect(entry('LIST').getState().status).toBe('resolved');
      expect(entry('LIST').getHistory().at(-1)).toMatchObject({ type: 'real', status: 200 });

      // A mock set on the endpoint is not overwritten by what the real API said before.
      entry('LIST').resolve(['mocked']);
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['mocked']);
      expect(entry('LIST').getState().value).toEqual(['mocked']);
    });

    it('an endpoint registered later starts with the real response seen while observing', async () => {
      nativeFetch.mockImplementation(
        async () => new Response('{"seen":true}', { status: 200, headers: { 'content-type': 'application/json' } }),
      );
      await fetch(`${BASE}/pets?status=sold`);
      runtime.register('EARLY', { method: 'get', baseUrl: BASE, path: '/pets' });
      expect(entry('EARLY').getState().value).toBeUndefined(); // not observing: nothing was kept
      runtime.unregister('EARLY');

      runtime.observeRequests();
      await fetch(`${BASE}/pets?status=sold`);
      await new Promise((resolve) => setTimeout(resolve, 0));
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });
      expect(entry('LIST').getState().value).toEqual({ seen: true });
    });

    it('observeRequests() keeps each distinct request once, mocked or not, without its query', async () => {
      await fetch(`${BASE}/owners`);
      expect(runtime.observedRequests()).toEqual([]); // nothing is kept until asked

      const announced: unknown[] = [];
      const onObserved = (e: Event): void => void announced.push((e as CustomEvent).detail);
      document.addEventListener('openapi-mock-observed', onObserved);
      runtime.observeRequests();
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [] } });
      await fetch(`${BASE}/pets?status=available&token=secret`);
      await fetch(`${BASE}/pets?status=sold`);
      await fetch(`${BASE}/owners`, { method: 'post', body: '{}' });

      expect(runtime.observedRequests()).toEqual([
        { method: 'GET', url: `${BASE}/pets` },
        { method: 'POST', url: `${BASE}/owners` },
      ]);
      expect(announced).toEqual(runtime.observedRequests()); // each one announced once
      document.removeEventListener('openapi-mock-observed', onObserved);
    });

    it('hold() releases to the real API when no configuration arrives', async () => {
      vi.useFakeTimers();
      runtime.hold(1000);
      const early = fetch(`${BASE}/pets`).then((res) => res.json());
      await vi.advanceTimersByTimeAsync(1000);
      expect(await early).toBe('real');
    });

    it('a configure control event keeps the rule of an endpoint the app registered itself', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: ['app'] } });
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: {
            key: '',
            action: 'configure',
            config: { endpoints: [{ key: 'LIST', rule: { method: 'get', baseUrl: 'https://wrong.example', path: '/pets' }, behavior: { value: ['panel'] } }] },
          },
        }),
      );
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['panel']);
    });

    it('dispatches openapi-mock-event DOM events', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [] } });
      const seen: unknown[] = [];
      const listener = (e: Event): void => void seen.push((e as CustomEvent).detail);
      document.addEventListener('openapi-mock-event', listener);
      await fetch(`${BASE}/pets`);
      document.removeEventListener('openapi-mock-event', listener);
      expect(seen).toMatchObject([
        { key: 'LIST', event: { type: 'request' } },
        { key: 'LIST', event: { type: 'respond', status: 200 } },
      ]);
    });

    it('re-registering a key keeps its override and history', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });
      entry('LIST').resolve(['kept']);
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: ['initial'] } });
      expect(await (await fetch(`${BASE}/pets`)).json()).toEqual(['kept']);
      expect(entry('LIST').getHistory().length).toBeGreaterThan(0);
    });
  });

  describe('XMLHttpRequest', () => {
    const request = (method: string, url: string, body?: string, responseType: XMLHttpRequestResponseType = '') =>
      new Promise<XMLHttpRequest>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = responseType;
        xhr.addEventListener('load', () => resolve(xhr));
        xhr.send(body);
      });

    it('answers a mocked endpoint', async () => {
      runtime.register('ADD', { method: 'post', baseUrl: BASE, path: '/pets' }, {
        behavior: { value: { id: 7 }, status: 201, headers: { 'X-Trace': 'abc' } },
      });
      const xhr = await request('POST', `${BASE}/pets`, JSON.stringify({ name: 'Rex' }));
      expect(xhr.readyState).toBe(4);
      expect(xhr.status).toBe(201);
      expect(xhr.statusText).toBe('Created');
      expect(xhr.responseText).toBe('{"id":7}');
      expect(xhr.responseURL).toBe(`${BASE}/pets`);
      expect(xhr.getResponseHeader('x-trace')).toBe('abc');
      expect(xhr.getAllResponseHeaders()).toContain('content-type: application/json\r\n');
      const [event] = entry('ADD').getHistory() as Extract<MockEvent, { type: 'request' }>[];
      expect(event.args).toEqual([{ name: 'Rex' }]);
    });

    it('returns a parsed object for responseType json', async () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { value: [1, 2] } });
      expect((await request('GET', `${BASE}/pets`, undefined, 'json')).response).toEqual([1, 2]);
    });

    it('fires abort instead of load when aborted while held', () => {
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' }, { behavior: { loading: true } });
      const xhr = new XMLHttpRequest();
      const events: string[] = [];
      for (const type of ['load', 'abort', 'loadend']) xhr.addEventListener(type, () => events.push(type));
      xhr.open('GET', `${BASE}/pets`);
      xhr.send();
      xhr.abort();
      entry('LIST').resolve([]);
      expect(events).toEqual(['abort', 'loadend']);
    });

    it('records the headers the app set', async () => {
      runtime.register('ADD', { method: 'post', baseUrl: BASE, path: '/pets' }, { behavior: { value: {} } });
      await new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${BASE}/pets`);
        xhr.setRequestHeader('Authorization', 'Bearer t');
        xhr.setRequestHeader('Accept-Language', 'it');
        xhr.setRequestHeader('accept-language', 'en');
        xhr.addEventListener('load', () => resolve());
        xhr.send('{}');
      });
      const [event] = entry('ADD').getHistory() as Extract<MockEvent, { type: 'request' }>[];
      expect(event.headers).toEqual({ authorization: 'Bearer t', 'accept-language': 'it, en' });
      expect(event.method).toBe('POST');
    });
  });

  describe('what a request carried, and what was served', () => {
    const requests = () => entry('GET').getHistory().filter((e) => e.type === 'request') as Extract<MockEvent, { type: 'request' }>[];

    it('records method, URL and headers of a fetch, from init and from a Request', async () => {
      runtime.register('GET', { method: 'get', baseUrl: BASE, path: '/pets/{id}' }, { behavior: { value: {} } });
      await fetch(`${BASE}/pets/1?lang=it`, { headers: { Authorization: 'Bearer a', 'X-Trace': '1' } });
      await fetch(new Request(`${BASE}/pets/2`, { headers: { authorization: 'Bearer b' } }));
      expect(requests().map(({ method, url, headers, args }) => ({ method, url, headers, args }))).toEqual([
        { method: 'GET', url: `${BASE}/pets/1?lang=it`, headers: { authorization: 'Bearer a', 'x-trace': '1' }, args: ['1', { lang: 'it' }] },
        { method: 'GET', url: `${BASE}/pets/2`, headers: { authorization: 'Bearer b' }, args: ['2'] },
      ]);
    });

    it('emits a respond event with the status of every mocked answer, and none for a passthrough', async () => {
      runtime.register('GET', { method: 'get', baseUrl: BASE, path: '/pets/{id}' }, { behavior: { value: {} } });
      await fetch(`${BASE}/pets/1`);
      entry('GET').fail({ title: 'gone' }, 404);
      await fetch(`${BASE}/pets/1`);
      runtime.register('LIST', { method: 'get', baseUrl: BASE, path: '/pets' });
      await fetch(`${BASE}/pets`);
      const served = (key: string) => entry(key).getHistory().flatMap((e) => (e.type === 'respond' ? [e.status] : []));
      expect(served('GET')).toEqual([200, 404]);
      expect(served('LIST')).toEqual([]);
    });
  });

  describe('strict mode', () => {
    it('refuses requests under a strict prefix that no behavior answers, and leaves others alone', async () => {
      runtime.setStrict(['/api/']);
      runtime.register('USER', { method: 'get', baseUrl: '/api', path: '/user' });
      runtime.register('PETS', { method: 'get', baseUrl: '/api', path: '/pets' }, { behavior: { value: [] } });
      const unmatched: unknown[] = [];
      document.addEventListener('openapi-mock-unmatched', (e) => unmatched.push((e as CustomEvent).detail));

      expect((await fetch('/api/pets')).status).toBe(200);
      const noEndpoint = await fetch('/api/orders', { method: 'POST' });
      expect(noEndpoint.status).toBe(501);
      expect((await noEndpoint.json()).message).toContain('no endpoint is mocked for POST /api/orders');
      expect((await fetch('/api/user')).status).toBe(501);
      // Outside the prefix: the real network, as without strict mode.
      expect(await (await fetch('/assets/i18n.json')).json()).toBe('real');
      expect(nativeFetch).toHaveBeenCalledTimes(1);

      expect(runtime.unmatchedRequests().map(({ method, url, reason, key }) => ({ method, url, reason, key }))).toEqual([
        { method: 'POST', url: '/api/orders', reason: 'no-endpoint', key: undefined },
        { method: 'GET', url: '/api/user', reason: 'no-behavior', key: 'USER' },
      ]);
      expect(unmatched).toHaveLength(2);
      // The refusal of a registered endpoint is visible in its history too.
      expect(entry('USER').getHistory().map((e) => e.type)).toEqual(['request', 'respond']);
    });

    it('is set by configure() and turned off with false', async () => {
      runtime.configure({ strict: [''] });
      expect((await fetch('/anything')).status).toBe(501);
      runtime.configure({ strict: false });
      expect((await fetch('/anything')).status).toBe(200);
    });
  });

  describe('setBehavior()', () => {
    it('sets any behavior, delivers it to held requests, and resets with undefined', async () => {
      runtime.register('GET', { method: 'get', baseUrl: BASE, path: '/pets/{id}' }, { behavior: { value: { id: 1 } } });
      runtime.setBehavior('GET', { loading: true });
      const held = fetch(`${BASE}/pets/1`);
      runtime.setBehavior('GET', { error: [{ code: 'X' }], status: 400, headers: { 'x-why': 'bad' } });
      const res = await held;
      expect(res.status).toBe(400);
      expect(res.headers.get('x-why')).toBe('bad');
      expect(await res.json()).toEqual([{ code: 'X' }]);

      runtime.setBehavior('GET', undefined);
      expect(await (await fetch(`${BASE}/pets/1`)).json()).toEqual({ id: 1 });
      // A held request is answered by the edit itself, so its respond comes before the error event.
      expect(entry('GET').getHistory().map((e) => e.type)).toEqual(
        ['loading', 'request', 'respond', 'error', 'reset', 'request', 'respond'],
      );
    });

    it('throws for an unknown key', () => {
      expect(() => runtime.setBehavior('NOPE', { value: 1 })).toThrow('No mocked endpoint is registered as "NOPE".');
    });
  });

  describe('cases: different answers for different requests of one endpoint', () => {
    const get = async (url: string) => {
      const res = await fetch(url);
      const text = await res.text();
      return { status: res.status, body: text ? JSON.parse(text) : null };
    };

    it('answers by path params and query, first match wins, otherwise the fallback', async () => {
      runtime.register('BOND', { method: 'get', baseUrl: BASE, path: '/bonds/{isin}' });
      runtime.setBehavior('BOND', {
        cases: [
          { when: { path: ['A'] }, then: { value: { isin: 'A' } } },
          { when: { path: ['B'] }, then: { error: { title: 'subscribers only' }, status: 403 } },
          { when: { query: { lang: 'it', tag: ['x', 'y'] } }, then: { value: { lang: 'it' } } },
        ],
        otherwise: { error: undefined, status: 404 },
      });
      expect(await get(`${BASE}/bonds/A`)).toEqual({ status: 200, body: { isin: 'A' } });
      expect(await get(`${BASE}/bonds/B`)).toEqual({ status: 403, body: { title: 'subscribers only' } });
      expect(await get(`${BASE}/bonds/C?lang=it&tag=x&tag=y&more=1`)).toEqual({ status: 200, body: { lang: 'it' } });
      // a query value that is only part of what was asked does not match
      expect((await get(`${BASE}/bonds/C?lang=it&tag=x`)).status).toBe(404);
      expect((await get(`${BASE}/bonds/C`)).status).toBe(404);
      const served = entry('BOND').getHistory().flatMap((e) => (e.type === 'respond' ? [e.status] : []));
      expect(served).toEqual([200, 403, 200, 404, 404]);
    });

    it('without a fallback, an unmatched request is one without a behavior: the network, or a 501 in strict mode', async () => {
      runtime.register('BOND', { method: 'get', baseUrl: '/api', path: '/bonds/{isin}' });
      runtime.setBehavior('BOND', { cases: [{ when: { path: ['A'] }, then: { value: 1 } }] });
      expect((await get('/api/bonds/A')).body).toBe(1);
      expect(await get('/api/bonds/Z')).toEqual({ status: 200, body: 'real' });
      runtime.setStrict(['/api/']);
      expect((await get('/api/bonds/Z')).status).toBe(501);
      expect(runtime.unmatchedRequests().map((u) => u.reason)).toEqual(['no-behavior']);
    });

    it('answers in turn with a sequence, repeats its last entry, and counts again on a new behavior', async () => {
      runtime.register('ME', { method: 'get', baseUrl: BASE, path: '/me' });
      runtime.setBehavior('ME', { sequence: [{ error: 'expired', status: 401 }, { value: 'ann' }] });
      expect((await get(`${BASE}/me`)).status).toBe(401);
      expect(await get(`${BASE}/me`)).toEqual({ status: 200, body: 'ann' });
      expect(await get(`${BASE}/me`)).toEqual({ status: 200, body: 'ann' });
      runtime.setBehavior('ME', { sequence: [{ error: 'expired', status: 401 }, { value: 'bob' }] });
      expect((await get(`${BASE}/me`)).status).toBe(401);
      // a sequence inside a case, counted on its own
      runtime.register('BOND', { method: 'get', baseUrl: BASE, path: '/bonds/{isin}' });
      runtime.setBehavior('BOND', {
        cases: [{ when: { path: ['A'] }, then: { sequence: [{ value: 1 }, { value: 2 }] } }],
        otherwise: { value: 0 },
      });
      expect((await get(`${BASE}/bonds/A`)).body).toBe(1);
      expect((await get(`${BASE}/bonds/B`)).body).toBe(0);
      expect((await get(`${BASE}/bonds/A`)).body).toBe(2);
    });

    it('answers a held request by its own case when cases arrive while it waits', async () => {
      runtime.register('BOND', { method: 'get', baseUrl: BASE, path: '/bonds/{isin}' }, { behavior: { loading: true } });
      const a = get(`${BASE}/bonds/A`);
      const b = get(`${BASE}/bonds/B`);
      await Promise.resolve();
      runtime.setBehavior('BOND', {
        cases: [{ when: { path: ['A'] }, then: { value: 'a' } }],
        otherwise: { value: 'other' },
      });
      expect(await a).toEqual({ status: 200, body: 'a' });
      expect(await b).toEqual({ status: 200, body: 'other' });
    });
  });
});
