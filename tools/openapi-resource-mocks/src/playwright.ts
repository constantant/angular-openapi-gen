/**
 * Playwright helper: mocks an app's API in the browser without a mock build, so the e2e tests can
 * run against the same build that is deployed.
 *
 * `installOpenApiMocks()` loads the framework-free runtime into every page of a page or browser
 * context with `addInitScript`, holds the page's first requests until it has sent the endpoints
 * and their current behaviors, and keeps each endpoint's history in Node, so it survives reloads
 * and full navigations. Endpoints come from the generated `mocks.endpoints.ts` (`ENDPOINTS`), and
 * its type maps type the fixtures:
 *
 * ```ts
 * import { ENDPOINTS, type EndpointResponses, type EndpointErrors } from '@myapp/api/endpoints';
 *
 * const api = await installOpenApiMocks<EndpointResponses, EndpointErrors>(page, {
 *   baseUrl: 'https://api.example.com/v2', endpoints: ENDPOINTS, strict: true,
 * });
 * await api.endpoint('GET_PET').resolve({ id: 1, name: 'Rex', photoUrls: [] });
 * await page.goto('/pets/1');
 * await api.endpoint('GET_PET').expectCalledWith('1');
 * ```
 *
 * Runs in Node. It needs no Angular, and Playwright only for its types.
 */
import * as fs from 'fs';
import * as path from 'path';
import { isDeepStrictEqual } from 'util';
import type { BrowserContext, Page } from '@playwright/test';
import type {
  ConfiguredEndpoint,
  MockBehavior,
  MockBehaviorOrCases,
  MockRequestMatch,
  MockRuntimeConfig,
  UnmatchedRequest,
} from './lib/interception/mock-runtime';
import type { MockEvent } from './lib/mock-events';
import type { MockResourceMeta } from './lib/mock-resource-meta';

/** One endpoint, as `ENDPOINTS` in a generated `mocks.endpoints.ts` describes it. */
export interface EndpointDescription {
  key: string;
  method: string;
  path: string;
  specId?: string;
  operationId?: string;
  tag?: string;
  responseType?: 'json' | 'text' | 'blob';
}

export interface OpenApiMocksOptions {
  /** The API's base URL as the app requests it: absolute, or relative to the page (`''`, `/api`). */
  baseUrl: string;
  /** `ENDPOINTS` from the generated `mocks.endpoints.ts`, or a list of descriptions. */
  endpoints: Readonly<Record<string, EndpointDescription>> | readonly EndpointDescription[];
  /** What each endpoint answers until a test sets something else (and after `reset()`). */
  defaults?: Readonly<Record<string, MockBehavior>>;
  /**
   * Fail closed: a request under these URL prefixes that no endpoint answers gets a 501 and is
   * recorded in `unmatched`, instead of reaching a real API. `true` means under `baseUrl`. Use a
   * narrower prefix (`'/api/'`) when `baseUrl` is the site's own origin.
   */
  strict?: boolean | string[];
  /** Longest the first requests of a page wait for the endpoints to arrive from Node. Default 5000. */
  holdMs?: number;
  /** How long `expectCalled*` / `waitForRequest` wait for a request by default. Default 5000. */
  timeoutMs?: number;
}

/** A request an endpoint received, as recorded in Node. */
export interface RecordedRequest {
  key: string;
  /** Path params (strings), then the body, then the query, as read from the wire. */
  args: unknown[];
  method: string;
  url: string;
  headers: Record<string, string>;
  ts: number;
}

type Behavior<T> = MockBehavior<T>;
type ValueOptions = { status?: number; headers?: Record<string, string>; delay?: number };

/** The controls of one endpoint. `T` is its response, `Errs` its error bodies keyed by status. */
export interface EndpointMock<T, Errs> {
  readonly key: string;
  /** Every request it received, across reloads and navigations, oldest first. */
  readonly requests: readonly RecordedRequest[];
  /** The `args` of each request. */
  readonly calls: readonly unknown[][];
  /** Answer with `value` from now on (in open pages, and in pages opened later). */
  resolve(value: T, options?: ValueOptions): Promise<void>;
  /**
   * Answer with a documented error: `status` is a key of the spec's responses (`'404'`), `body` is
   * typed by it. For a range or `default` key, give the numeric `code` too.
   */
  fail<S extends Extract<keyof Errs, string>>(status: S, body: Errs[S], code?: number): Promise<void>;
  /** Answer with any failing status and body, documented or not (a 500, a 503 from a proxy). */
  failWith(status: number, body?: unknown, headers?: Record<string, string>): Promise<void>;
  /** Hold every request open until the next `resolve` / `fail`. */
  setLoading(): Promise<void>;
  /** Any behavior, with every field (`delay`, `progress`, …). */
  set(behavior: Behavior<T>): Promise<void>;
  /**
   * The answer to the requests that match (path params in template order, query values as strings), e.g.
   * `when({ path: ['XS0000000001'] }).fail('403', body)` while other bonds resolve. Cases are tried in the
   * order they were first set; setting one again for the same match replaces it. Other requests get the endpoint's
   * own behavior.
   */
  when(match: MockRequestMatch): EndpointCase<T, Errs>;
  /** Back to the default given to `installOpenApiMocks` (or no behavior), and no cases. */
  reset(): Promise<void>;
  /** Throws when the endpoint received no request within the timeout. */
  expectCalled(timeoutMs?: number): Promise<RecordedRequest>;
  /** Throws when no request with exactly these args arrives within the timeout. */
  expectCalledWith(...args: unknown[]): Promise<RecordedRequest>;
  /** The first request (already received or still to come) that `predicate` accepts. */
  waitForRequest(predicate?: (request: RecordedRequest) => boolean, timeoutMs?: number): Promise<RecordedRequest>;
  /** Forget the requests recorded so far. */
  clearRequests(): void;
}

/** The answer of an endpoint to the requests that match a case (see `EndpointMock.when`). */
export interface EndpointCase<T, Errs> {
  resolve(value: T, options?: ValueOptions): Promise<void>;
  fail<S extends Extract<keyof Errs, string>>(status: S, body: Errs[S], code?: number): Promise<void>;
  failWith(status: number, body?: unknown, headers?: Record<string, string>): Promise<void>;
  setLoading(): Promise<void>;
  set(behavior: Behavior<T>): Promise<void>;
}

/** What the tests exercised on one endpoint, for a coverage report. */
export interface EndpointCoverage {
  key: string;
  requests: number;
  /** The statuses the mocks answered it with (distinct, sorted). */
  served: number[];
  /** Whether a test asserted what it was sent (`expectCalledWith`, or `waitForRequest` with a predicate). */
  inputsAsserted: boolean;
}

export interface OpenApiMocks<R, E> {
  endpoint<K extends Extract<keyof R, string>>(key: K): EndpointMock<R[K], K extends keyof E ? E[K] : Record<never, never>>;
  /** Requests strict mode refused, across every page. */
  readonly unmatched: readonly UnmatchedRequest[];
  /** Throws, listing them, when strict mode refused any request. */
  expectNoUnmatched(): void;
  coverage(): EndpointCoverage[];
}

interface Recorded {
  requests: RecordedRequest[];
  served: Set<number>;
  inputsAsserted: boolean;
  waiters: Set<() => void>;
}

const BINDING_CONFIG = '__oarmPwConfig__';
const BINDING_EVENT = '__oarmPwEvent__';
const BINDING_UNMATCHED = '__oarmPwUnmatched__';

let cachedRuntime: string | undefined;

/**
 * The runtime as a script that defines `__oarmRuntimeModule__`: the published package ships it
 * prebuilt (`runtime.global.js`); in a source checkout it is bundled with esbuild on first use.
 */
export function runtimeScript(): string {
  if (cachedRuntime) return cachedRuntime;
  const prebuilt = path.join(__dirname, 'runtime.global.js');
  if (fs.existsSync(prebuilt)) return (cachedRuntime = fs.readFileSync(prebuilt, 'utf8'));
  let esbuild: { buildSync(options: Record<string, unknown>): { outputFiles: Array<{ text: string }> } };
  try {
    esbuild = require('esbuild');
  } catch {
    throw new Error('runtime.global.js is missing next to the Playwright helper, and esbuild is not installed to build it.');
  }
  const entry = ['runtime.ts', 'runtime.js'].map((f) => path.join(__dirname, f)).find((f) => fs.existsSync(f));
  if (!entry) throw new Error(`Cannot find the runtime entry next to ${__filename}.`);
  const result = esbuild.buildSync({ ...RUNTIME_BUNDLE_OPTIONS, entryPoints: [entry], write: false });
  return (cachedRuntime = result.outputFiles[0].text);
}

/**
 * How the runtime is bundled, here and by the package build (`scripts/bundle-runtime.mjs`).
 * Playwright runs an init script inside a function, so the IIFE's `var` would stay local: the
 * footer publishes it on `globalThis`.
 */
export const RUNTIME_BUNDLE_OPTIONS = {
  bundle: true,
  format: 'iife',
  globalName: '__oarmRuntimeModule__',
  footer: { js: 'globalThis.__oarmRuntimeModule__ = __oarmRuntimeModule__;' },
  platform: 'browser',
  target: 'es2020',
} as const;

/** Runs in the page (main frame only) right after the runtime script; must be self-contained. */
function bootstrap(init: { strict: string[] | false; holdMs: number; bindings: [string, string, string] }): void {
  if (window !== window.top) return;
  const [configBinding, eventBinding, unmatchedBinding] = init.bindings;
  const globals = window as unknown as Record<string, unknown>;
  const module = globals['__oarmRuntimeModule__'] as { installMockInterception(): import('./lib/interception/mock-runtime').MockRuntime };
  const runtime = module.installMockInterception();
  runtime.setStrict(init.strict);
  runtime.hold(init.holdMs);
  const call = (name: string, ...args: unknown[]): Promise<unknown> =>
    (globals[name] as (...a: unknown[]) => Promise<unknown>)(...args);
  document.addEventListener('openapi-mock-event', (e) => void call(eventBinding, (e as CustomEvent).detail));
  document.addEventListener('openapi-mock-unmatched', (e) => void call(unmatchedBinding, (e as CustomEvent).detail));
  void call(configBinding).then((config) => runtime.configure(config as MockRuntimeConfig));
}

function isContext(target: Page | BrowserContext): target is BrowserContext {
  return typeof (target as BrowserContext).pages === 'function';
}

function describeArgs(args: unknown[]): string {
  return JSON.stringify(args);
}

export async function installOpenApiMocks<R = Record<string, unknown>, E = Record<string, Record<string, unknown>>>(
  target: Page | BrowserContext,
  options: OpenApiMocksOptions,
): Promise<OpenApiMocks<R, E>> {
  const descriptions = Array.isArray(options.endpoints)
    ? (options.endpoints as readonly EndpointDescription[])
    : Object.values(options.endpoints as Record<string, EndpointDescription>);
  const byKey = new Map(descriptions.map((d) => [d.key, d]));
  const overrides = new Map<string, MockBehavior>();
  const cases = new Map<string, Array<{ when: MockRequestMatch; then: MockBehavior }>>();
  const recorded = new Map<string, Recorded>();
  const unmatched: UnmatchedRequest[] = [];
  const timeoutMs = options.timeoutMs ?? 5000;
  const strict =
    options.strict === true ? [options.baseUrl] : Array.isArray(options.strict) ? [...options.strict] : (false as const);

  const recordOf = (key: string): Recorded => {
    let r = recorded.get(key);
    if (!r) recorded.set(key, (r = { requests: [], served: new Set(), inputsAsserted: false, waiters: new Set() }));
    return r;
  };
  const current = (key: string): MockBehaviorOrCases | undefined => {
    const base = overrides.get(key) ?? options.defaults?.[key];
    const list = cases.get(key);
    return list?.length ? { cases: list, ...(base ? { otherwise: base } : {}) } : base;
  };

  const config = (): MockRuntimeConfig => ({
    strict,
    endpoints: descriptions.map((d): ConfiguredEndpoint => {
      const meta: MockResourceMeta = {
        specId: d.specId ?? '',
        operationId: d.operationId ?? d.key,
        path: d.path,
        method: d.method.toLowerCase(),
        ...(d.tag ? { tag: d.tag } : {}),
        ...(d.responseType && d.responseType !== 'json' ? { responseType: d.responseType } : {}),
      };
      const behavior = current(d.key);
      return {
        key: d.key,
        rule: { method: d.method, baseUrl: options.baseUrl, path: d.path },
        meta,
        ...(behavior ? { behavior } : {}),
      };
    }),
  });

  const onEvent = (detail: { key: string; event: MockEvent }): void => {
    const { key, event } = detail;
    const r = recordOf(key);
    if (event.type === 'request') {
      r.requests.push({
        key,
        args: event.args,
        method: event.method ?? '',
        url: event.url ?? '',
        headers: event.headers ?? {},
        ts: event.ts,
      });
      r.waiters.forEach((wake) => wake());
    } else if (event.type === 'respond') {
      r.served.add(event.status);
    }
  };

  const bindings: [string, string, string] = [BINDING_CONFIG, BINDING_EVENT, BINDING_UNMATCHED];
  await target.exposeBinding(BINDING_CONFIG, () => config());
  await target.exposeBinding(BINDING_EVENT, (_source, detail: { key: string; event: MockEvent }) => onEvent(detail));
  await target.exposeBinding(BINDING_UNMATCHED, (_source, refused: UnmatchedRequest) => {
    unmatched.push(refused);
  });
  await target.addInitScript({ content: runtimeScript() });
  await target.addInitScript(bootstrap, { strict, holdMs: options.holdMs ?? 5000, bindings });

  /**
   * Sets an endpoint's behavior (`undefined`: back to its default) in every open page that has the
   * runtime; pages loaded later get it from `config()`.
   */
  const apply = async (key: string, behavior: MockBehavior | undefined): Promise<void> => {
    if (behavior === undefined) {
      overrides.delete(key);
      cases.delete(key);
    } else overrides.set(key, behavior);
    return push(key);
  };

  const applyCase = (key: string, when: MockRequestMatch, then: MockBehavior): Promise<void> => {
    const list = cases.get(key) ?? [];
    const same = list.findIndex((c) => isDeepStrictEqual(c.when, when));
    if (same >= 0) list[same] = { when, then };
    else list.push({ when, then });
    cases.set(key, list);
    return push(key);
  };

  /** Sends the endpoint's current behavior (cases included) to every open page that has the runtime. */
  const push = async (key: string): Promise<void> => {
    if (!byKey.has(key)) throw new Error(`"${key}" is not one of the endpoints given to installOpenApiMocks.`);
    const pages = isContext(target) ? target.pages() : [target];
    await Promise.all(
      pages.map((page) =>
        page
          .evaluate(
            ({ key, behavior }) => {
              type Runtime = { controls(k: string): unknown; setBehavior(k: string, b: unknown): void };
              const installed = (globalThis as unknown as Record<string, { runtime?: Runtime } | undefined>)['__oarmRuntime__'];
              if (installed?.runtime?.controls(key)) installed.runtime.setBehavior(key, behavior);
            },
            { key, behavior: current(key) },
          )
          // A page that is navigating or closed picks the behavior up from `config()` on its next load.
          .catch(() => undefined),
      ),
    );
  };

  const waitFor = (key: string, predicate: (r: RecordedRequest) => boolean, ms: number, what: () => string): Promise<RecordedRequest> => {
    const r = recordOf(key);
    const found = r.requests.find(predicate);
    if (found) return Promise.resolve(found);
    return new Promise((resolve, reject) => {
      const wake = (): void => {
        const hit = r.requests.find(predicate);
        if (!hit) return;
        cleanup();
        resolve(hit);
      };
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error(what()));
      }, ms);
      const cleanup = (): void => {
        clearTimeout(timer);
        r.waiters.delete(wake);
      };
      r.waiters.add(wake);
    });
  };

  const endpoint = (key: string): EndpointMock<unknown, Record<string, unknown>> => {
    if (!byKey.has(key)) throw new Error(`"${key}" is not one of the endpoints given to installOpenApiMocks.`);
    const r = recordOf(key);
    const received = (): string =>
      r.requests.length === 0 ? 'it received no request' : `it received ${r.requests.map((q) => describeArgs(q.args)).join(', ')}`;
    return {
      key,
      get requests() {
        return [...r.requests];
      },
      get calls() {
        return r.requests.map((q) => q.args);
      },
      resolve: (value, opts) => apply(key, { value, ...opts }),
      fail: (status, body, code) => {
        const numeric = code ?? Number(status);
        if (!Number.isInteger(numeric)) throw new Error(`${key}: give the numeric status for "${status}" as the third argument.`);
        return apply(key, { error: body, status: numeric });
      },
      failWith: (status, body, headers) => apply(key, { error: body, status, ...(headers ? { headers } : {}) }),
      setLoading: () => apply(key, { loading: true }),
      set: (behavior) => apply(key, behavior as MockBehavior),
      when: (match) => ({
        resolve: (value, opts) => applyCase(key, match, { value, ...opts }),
        fail: (status, body, code) => {
          const numeric = code ?? Number(status);
          if (!Number.isInteger(numeric)) throw new Error(`${key}: give the numeric status for "${status}" as the third argument.`);
          return applyCase(key, match, { error: body, status: numeric });
        },
        failWith: (status, body, headers) => applyCase(key, match, { error: body, status, ...(headers ? { headers } : {}) }),
        setLoading: () => applyCase(key, match, { loading: true }),
        set: (behavior) => applyCase(key, match, behavior as MockBehavior),
      }),
      reset: () => apply(key, undefined),
      expectCalled: (ms = timeoutMs) => waitFor(key, () => true, ms, () => `${key} was not requested within ${ms} ms.`),
      expectCalledWith: (...args) => {
        r.inputsAsserted = true;
        return waitFor(
          key,
          (q) => isDeepStrictEqual(q.args, args),
          timeoutMs,
          () => `${key} was not requested with ${describeArgs(args)} within ${timeoutMs} ms; ${received()}.`,
        );
      },
      waitForRequest: (predicate, ms = timeoutMs) => {
        if (predicate) r.inputsAsserted = true;
        return waitFor(key, predicate ?? (() => true), ms, () => `No matching request to ${key} within ${ms} ms; ${received()}.`);
      },
      clearRequests: () => {
        r.requests.length = 0;
      },
    };
  };

  return {
    endpoint: endpoint as OpenApiMocks<R, E>['endpoint'],
    get unmatched() {
      return [...unmatched];
    },
    expectNoUnmatched: () => {
      if (unmatched.length === 0) return;
      const lines = unmatched.map((u) => `  ${u.method} ${u.url}${u.key ? ` (${u.key} has no behavior)` : ''}`);
      throw new Error(`Strict mode refused ${unmatched.length} request(s) no mock answered:\n${lines.join('\n')}`);
    },
    coverage: () =>
      descriptions.map((d) => {
        const r = recordOf(d.key);
        return { key: d.key, requests: r.requests.length, served: [...r.served].sort((a, b) => a - b), inputsAsserted: r.inputsAsserted };
      }),
  };
}

export type { MockBehavior, MockCases, MockRequestMatch, UnmatchedRequest } from './lib/interception/mock-runtime';
export type { MockEvent } from './lib/mock-events';
