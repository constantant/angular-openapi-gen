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
      expect(seen).toMatchObject([{ key: 'LIST', event: { type: 'request' } }]);
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
  });
});
