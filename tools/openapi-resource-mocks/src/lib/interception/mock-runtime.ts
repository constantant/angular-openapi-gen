import type { MockEvent, MockProgress } from '../mock-events';
import type { MockResourceMeta } from '../mock-resource-meta';
import type { WindowMockEntry } from '../window-mock-entry';
import { isJsonContentType, pageHref } from './transport-utils';
import { compileEndpointRule, type EndpointMatcher, type EndpointRule } from './url-matcher';

/**
 * How a mocked endpoint answers. `value` is sent as the response body (JSON unless it is a string,
 * `Blob` or `ArrayBuffer`); `error` is sent as the body of a failing response (`status` defaults to
 * 500), so the app sees a real `HttpErrorResponse`. `loading` holds every request open until the
 * endpoint is resolved or failed. `T` is the type of `value`: generated mock files pass the
 * endpoint's response type, the runtime itself works with `unknown`.
 */
export type MockBehavior<T = unknown> = (
  | { value: T; delay?: number; status?: number; headers?: Record<string, string> }
  | { loading: true }
  | { error: unknown; delay?: number; status?: number; headers?: Record<string, string> }
) & {
  /** Transfer progress reported to the request before it is answered (or while it is held). */
  progress?: MockProgress[];
};

export interface MockResponse {
  status: number;
  /** Lower-cased header names; includes the `content-type` of `body`. */
  headers: Record<string, string>;
  /** The body as sent on the wire. */
  body: string | Blob | ArrayBuffer | undefined;
  /** The value the body was encoded from. */
  value: unknown;
}

/** `'passthrough'` tells the patched `fetch` / `XMLHttpRequest` to perform the real request. */
export type MockResult = MockResponse | 'passthrough';

export interface InterceptedRequest {
  method: string;
  url: string;
  /** Request body, already parsed when it was JSON. */
  body?: unknown;
}

export interface Interception {
  result: Promise<MockResult>;
  /** Transfer progress reported for this request while it is held (`setProgress` / `simulateProgress`). */
  onProgress(cb: (progress: MockProgress) => void): void;
  /** The caller aborted: stop any pending delay and forget the request. */
  cancel(): void;
}

/** One endpoint handed to {@link MockRuntime.configure} by a tool outside the app (the DevTools extension). */
export interface ConfiguredEndpoint {
  key: string;
  rule: EndpointRule;
  meta?: MockResourceMeta;
  /** What the tool last set (`resolve` / `fail` / `setLoading`); `reset()` drops it. */
  behavior?: MockBehavior;
}

export interface MockRuntimeConfig {
  endpoints?: ConfiguredEndpoint[];
  catchModes?: Record<string, boolean>;
}

/** A request the page made, as kept by {@link MockRuntime.observeRequests}: no query, no body. */
export interface ObservedRequest {
  /** Upper-case HTTP method. */
  method: string;
  /** Absolute URL without query and fragment. */
  url: string;
}

/** How many distinct requests {@link MockRuntime.observeRequests} keeps. */
const MAX_OBSERVED = 300;

/** A real response larger than this is not kept as an example. */
const MAX_REAL_BODY = 512 * 1024;
/** Total size of the real responses kept for requests no endpoint is registered for yet. */
const MAX_UNCLAIMED_BODIES = 4 * 1024 * 1024;

/** What a transport hands to {@link MockRuntime.realResponse} after a request reached the real API. */
export interface RealResponse {
  method: string;
  url: string;
  status: number;
  contentType: string | null;
  /** Reads the body as text; only called when the runtime wants it. */
  text(): Promise<string> | string;
}

interface UnclaimedResponse {
  method: string;
  url: string;
  status: number;
  value: unknown;
  size: number;
}

export interface MockRegistration {
  meta?: MockResourceMeta;
  /** A fixed behavior, or a function asked once per request (e.g. to step through a sequence). */
  behavior?: MockBehavior | (() => MockBehavior | undefined);
}

interface Pending {
  settle(result: MockResult): void;
  /** Set while the request is held by catch mode. */
  caught?: { requestId: string; args: unknown[]; ts: number };
  timer?: ReturnType<typeof setTimeout>;
  progress?: (progress: MockProgress) => void;
}

/** What a generated `httpResource` token hands to `globalThis.__oarmTrack__`. */
interface Reloadable {
  reload(): boolean;
}

/** `WeakRef`, typed locally so the package compiles for consumers whose `lib` predates ES2021. */
interface WeakHandle<T> {
  deref(): T | undefined;
}
const WeakRefCtor = (globalThis as { WeakRef?: new <T extends object>(target: T) => WeakHandle<T> }).WeakRef;

/** How long a reload started by a mock edit may take to reach the transport. */
const PUSH_WINDOW_MS = 2000;

interface Entry {
  key: string;
  matcher: EndpointMatcher;
  order: number;
  meta?: MockResourceMeta;
  initial?: MockBehavior | (() => MockBehavior | undefined);
  /** Set from the window API / DevTools panel; wins over `initial` until `reset()`. */
  override?: MockBehavior;
  pending: Set<Pending>;
  history: MockEvent[];
  listeners: Set<(event: MockEvent) => void>;
  state: { status: string; value: unknown; error: unknown; progress: MockProgress | undefined; requestCount: number };
  /** Requests expected from resources reloaded by a mock edit: they are answered, never caught. */
  pushed: { count: number; until: number };
  /** The controls of the endpoint, also published as `window.__openApiMocks__[key]`. */
  api?: WindowMockEntry;
}

interface ControlDetail {
  key: string;
  action: string;
  value?: unknown;
  status?: number;
  delayMs?: number;
  progressType?: 'upload' | 'download';
  loaded?: number;
  total?: number;
  steps?: number;
  rule?: EndpointRule;
  meta?: MockResourceMeta;
  behavior?: MockBehavior;
  config?: MockRuntimeConfig;
}

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);

function isBinary(value: unknown): value is Blob | ArrayBuffer {
  return (
    (typeof Blob !== 'undefined' && value instanceof Blob) ||
    (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer)
  );
}

/**
 * Everything is sent as JSON — a string value too, because a JSON endpoint parses its body — except
 * binary values and the string of an endpoint whose response is declared as text.
 */
function toResponse(behavior: Exclude<MockBehavior, { loading: true }>, meta?: MockResourceMeta): MockResponse {
  const failed = 'error' in behavior;
  const value = failed ? behavior.error : behavior.value;
  const headers: Record<string, string> = {};
  let body: MockResponse['body'];
  if (isBinary(value)) {
    body = value;
  } else if (value !== undefined) {
    const asText = !failed && meta?.responseType === 'text' && typeof value === 'string';
    body = asText ? value : JSON.stringify(value);
    headers['content-type'] = asText ? 'text/plain' : 'application/json';
  }
  for (const [name, header] of Object.entries(behavior.headers ?? {})) headers[name.toLowerCase()] = header;
  return { status: behavior.status ?? (failed ? 500 : value === undefined ? 204 : 200), headers, body, value };
}

function sanitizeArg(arg: unknown): unknown {
  if (typeof FormData !== 'undefined' && arg instanceof FormData) return '[FormData]';
  if (typeof File !== 'undefined' && arg instanceof File) return `[File: ${arg.name}]`;
  if (typeof Blob !== 'undefined' && arg instanceof Blob) return '[Blob]';
  if (typeof ArrayBuffer !== 'undefined' && arg instanceof ArrayBuffer) return '[ArrayBuffer]';
  return arg;
}

/**
 * Framework-free mock registry behind the patched `fetch` / `XMLHttpRequest`.
 *
 * Endpoints are registered as method + base URL + path template. A request that matches a
 * registered endpoint is answered here without touching the network; anything else — and any
 * registered endpoint that has no behavior yet — passes through to the real API.
 */
export class MockRuntime {
  private readonly entries = new Map<string, Entry>();
  private readonly catchModeKeys = new Set<string>();
  private readonly resources = new Map<string, Set<WeakHandle<Reloadable>>>();
  /** Requests made while the configuration is still on its way; see {@link hold}. */
  private held: Array<() => void> | undefined;
  /** Distinct requests seen by the transports, keyed by method + URL; see {@link observeRequests}. */
  private observed: Map<string, ObservedRequest> | undefined;
  /** Real responses to requests that matched no endpoint, kept while observing; see {@link realResponse}. */
  private readonly unclaimed = new Map<string, UnclaimedResponse>();
  private unclaimedSize = 0;
  private order = 0;
  private reqCount = 0;
  private readonly onControl = (e: Event): void => this.control((e as CustomEvent<ControlDetail>).detail);

  constructor() {
    if (typeof document === 'undefined') return;

    // Catch modes injected by the DevTools extension at navigation start, so the very first
    // request of the page is already held.
    const globals = window as unknown as Record<string, unknown>;
    const pending = globals['__oarmPendingCatch__'];
    if (pending && typeof pending === 'object') {
      for (const [key, enabled] of Object.entries(pending as Record<string, boolean>)) {
        if (enabled) this.catchModeKeys.add(key);
      }
      delete globals['__oarmPendingCatch__'];
    }

    document.addEventListener('openapi-mock-control', this.onControl);
  }

  /**
   * Remembers a live `httpResource` created by a generated token, so that editing the mock of
   * `key` can re-run it. Held weakly: a destroyed component's resources just drop out.
   */
  track(key: string, ref: Reloadable): void {
    if (!WeakRefCtor) return;
    let refs = this.resources.get(key);
    if (!refs) this.resources.set(key, (refs = new Set()));
    for (const known of refs) if (!known.deref()) refs.delete(known);
    refs.add(new WeakRefCtor(ref));
  }

  /** Re-runs the live resources of `entry`. Returns how many started a new request. */
  private reloadLive(entry: Entry): number {
    let reloaded = 0;
    for (const known of this.resources.get(entry.key) ?? []) {
      if (known.deref()?.reload()) reloaded++;
    }
    if (reloaded > 0) entry.pushed = { count: reloaded, until: Date.now() + PUSH_WINDOW_MS };
    return reloaded;
  }

  /** Removes every endpoint and stops listening for control events. */
  dispose(): void {
    this.resources.clear();
    for (const key of [...this.entries.keys()]) this.unregister(key);
    if (typeof document !== 'undefined') document.removeEventListener('openapi-mock-control', this.onControl);
  }

  /**
   * Registers (or re-registers) an endpoint. Re-registering a key keeps its override, catch mode
   * and history, so an endpoint created from the DevTools panel is taken over in place when the
   * app registers the same key. Returns a function that removes the endpoint.
   */
  register(key: string, rule: EndpointRule, registration: MockRegistration = {}): () => void {
    const existing = this.entries.get(key);
    const entry: Entry = existing ?? {
      key,
      matcher: compileEndpointRule(rule),
      order: 0,
      pending: new Set(),
      history: [],
      listeners: new Set(),
      state: { status: 'idle', value: undefined, error: undefined, progress: undefined, requestCount: 0 },
      pushed: { count: 0, until: 0 },
    };
    entry.matcher = compileEndpointRule(rule);
    entry.order = ++this.order;
    if (registration.meta) entry.meta = registration.meta;
    if (registration.behavior) entry.initial = registration.behavior;
    this.entries.set(key, entry);
    if (!existing) {
      this.exposeToWindow(entry);
      this.claimRealResponse(entry);
    }
    return () => this.unregister(key);
  }

  unregister(key: string): void {
    const entry = this.entries.get(key);
    if (!entry) return;
    for (const pending of [...entry.pending]) this.finish(entry, pending, 'passthrough');
    this.entries.delete(key);
    if (typeof window !== 'undefined') delete window.__openApiMocks__?.[key];
  }

  /** The controls of a registered endpoint — the same object as `window.__openApiMocks__[key]`. */
  controls(key: string): WindowMockEntry | undefined {
    return this.entries.get(key)?.api;
  }

  isCatchMode(key: string): boolean {
    return this.catchModeKeys.has(key);
  }

  setCatchMode(key: string, enabled: boolean): void {
    if (enabled) {
      this.catchModeKeys.add(key);
      return;
    }
    this.catchModeKeys.delete(key);
    // Requests that catch mode is holding would otherwise hang: let them continue as if they had
    // never been caught — the endpoint's behavior, or the real API when it has none.
    const entry = this.entries.get(key);
    if (!entry) return;
    for (const pending of [...entry.pending]) {
      if (!pending.caught) continue;
      pending.caught = undefined;
      this.apply(entry, pending, entry.override ?? this.initialOf(entry));
    }
  }

  /**
   * Parks every request until {@link configure} (or `timeoutMs`) releases them. A tool that learns
   * its endpoints asynchronously — the DevTools extension asks its service worker at document
   * start — calls this first, so that not even the app's very first request slips past the mocks.
   */
  hold(timeoutMs: number): void {
    if (this.held) return;
    this.held = [];
    setTimeout(() => this.release(), timeoutMs);
  }

  private release(): void {
    const held = this.held;
    this.held = undefined;
    held?.forEach((resume) => resume());
  }

  /** Registers the endpoints of an outside tool with what it last set on them, then releases {@link hold}. */
  configure(config: MockRuntimeConfig): void {
    for (const [key, enabled] of Object.entries(config.catchModes ?? {})) this.setCatchMode(key, enabled);
    for (const endpoint of config.endpoints ?? []) this.registerConfigured(endpoint);
    this.release();
  }

  private registerConfigured({ key, rule, meta, behavior }: ConfiguredEndpoint): void {
    // An endpoint the app registered itself keeps its rule: the app knows its real base URL.
    if (!this.entries.has(key)) this.register(key, rule, { meta });
    const entry = this.entries.get(key);
    if (entry && behavior) entry.override = behavior;
  }

  /**
   * Starts remembering which requests the page makes — mocked or not — so a tool can work out
   * where an API is served and which of its operations the page uses (the DevTools panel suggests
   * base URLs and lists the endpoints from it). Each new one is also announced with an
   * `openapi-mock-observed` DOM event. Only the method and
   * the URL without its query are kept, once per distinct request, in memory.
   */
  observeRequests(): void {
    this.observed ??= new Map();
  }

  /** The distinct requests seen since {@link observeRequests}; empty when it was never called. */
  observedRequests(): ObservedRequest[] {
    return [...(this.observed?.values() ?? [])];
  }

  private observe(request: InterceptedRequest): void {
    if (!this.observed || this.observed.size >= MAX_OBSERVED) return;
    try {
      const target = new URL(request.url, pageHref());
      if (target.protocol !== 'http:' && target.protocol !== 'https:') return;
      const observed = { method: request.method.toUpperCase(), url: target.origin + target.pathname };
      const id = `${observed.method} ${observed.url}`;
      if (this.observed.has(id)) return;
      this.observed.set(id, observed);
      // Tools that are already listening learn about it right away; others read observedRequests().
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('openapi-mock-observed', { detail: observed }));
      }
    } catch {
      // not a URL the page could have requested
    }
  }

  /** Whether a transport should report the real response of this request to {@link realResponse}. */
  wantsRealResponse(method: string, url: string): boolean {
    return this.observed !== undefined || this.bestMatch(method.toUpperCase(), url) !== undefined;
  }

  /**
   * Called by the patched transports when a request was answered by the real API. A JSON body is
   * kept as the endpoint's last known real response — shown by the DevTools panel as the starting
   * point for a mock — and reported with a `real` event. It does not change how requests are
   * answered. While {@link observeRequests} is on, responses to requests no endpoint is registered
   * for are kept too (bounded), so an endpoint registered afterwards starts with one.
   */
  async realResponse(response: RealResponse): Promise<void> {
    if (!isJsonContentType(response.contentType)) return;
    const method = response.method.toUpperCase();
    const entry = this.bestMatch(method, response.url)?.entry;
    if (!entry && !this.observed) return;
    let text: string;
    let value: unknown;
    try {
      text = await response.text();
      if (text.length > MAX_REAL_BODY) return;
      value = JSON.parse(text);
    } catch {
      return;
    }
    if (entry) {
      // The entry may have been unregistered while the body was read.
      if (this.entries.get(entry.key) === entry) this.applyReal(entry, response.status, value);
      return;
    }
    let id: string;
    try {
      const target = new URL(response.url, pageHref());
      id = `${method} ${target.origin}${target.pathname}`;
    } catch {
      return;
    }
    this.unclaimedSize -= this.unclaimed.get(id)?.size ?? 0;
    this.unclaimed.delete(id);
    this.unclaimed.set(id, { method, url: response.url, status: response.status, value, size: text.length });
    this.unclaimedSize += text.length;
    for (const [oldest, kept] of this.unclaimed) {
      if (this.unclaimedSize <= MAX_UNCLAIMED_BODIES) break;
      this.unclaimed.delete(oldest);
      this.unclaimedSize -= kept.size;
    }
  }

  private applyReal(entry: Entry, status: number, value: unknown): void {
    // Only an endpoint that is not answering by itself shows the real response as its state.
    if (!entry.override && entry.pending.size === 0) {
      entry.state.status = status >= 400 ? 'error' : 'resolved';
      if (status >= 400) entry.state.error = value;
      else {
        entry.state.value = value;
        entry.state.error = undefined;
      }
    }
    this.emit(entry, { type: 'real', status, value, ts: Date.now() });
  }

  /** Gives a newly registered endpoint the latest real response already seen for it. */
  private claimRealResponse(entry: Entry): void {
    let latest: UnclaimedResponse | undefined;
    for (const kept of this.unclaimed.values()) {
      if (kept.status < 400 && entry.matcher.match(kept.method, kept.url)) latest = kept;
    }
    if (latest) this.applyReal(entry, latest.status, latest.value);
  }

  private bestMatch(
    method: string,
    url: string,
  ): { entry: Entry; pathParams: string[]; query: Record<string, string | string[]> } | undefined {
    let best: { entry: Entry; pathParams: string[]; query: Record<string, string | string[]> } | undefined;
    for (const entry of this.entries.values()) {
      const match = entry.matcher.match(method, url);
      if (!match) continue;
      const wins =
        !best ||
        entry.matcher.specificity > best.entry.matcher.specificity ||
        (entry.matcher.specificity === best.entry.matcher.specificity && entry.order > best.entry.order);
      if (wins) best = { entry, ...match };
    }
    return best;
  }

  /** Called by the patched transports. `undefined` means: not mocked, perform the real request. */
  intercept(request: InterceptedRequest): Interception | undefined {
    this.observe(request);
    if (this.held) return this.interceptLater(request, this.held);
    return this.interceptNow(request);
  }

  private interceptLater(request: InterceptedRequest, held: Array<() => void>): Interception {
    let inner: Interception | undefined;
    let cancelled = false;
    let onProgress: ((progress: MockProgress) => void) | undefined;
    const result = new Promise<MockResult>((resolve) => {
      held.push(() => {
        if (cancelled) return;
        inner = this.interceptNow(request);
        if (!inner) return resolve('passthrough');
        if (onProgress) inner.onProgress(onProgress);
        void inner.result.then(resolve);
      });
    });
    return {
      result,
      onProgress: (cb) => {
        onProgress = cb;
        inner?.onProgress(cb);
      },
      cancel: () => {
        cancelled = true;
        inner?.cancel();
      },
    };
  }

  private interceptNow(request: InterceptedRequest): Interception | undefined {
    const method = request.method.toUpperCase();
    const best = this.bestMatch(method, request.url);
    if (!best) return undefined;

    const { entry } = best;
    const args: unknown[] = [...best.pathParams];
    if (BODY_METHODS.has(method) && request.body !== undefined) args.push(request.body);
    if (Object.keys(best.query).length > 0) args.push(best.query);

    entry.state.requestCount++;
    this.emit(entry, { type: 'request', args, ts: Date.now() });

    // A request caused by a mock edit (see `reloadLive`) delivers that edit; catching it again would
    // leave the resource loading forever.
    const pushed = entry.pushed.count > 0 && Date.now() <= entry.pushed.until;
    if (pushed) entry.pushed.count--;
    const caught = !pushed && this.catchModeKeys.has(entry.key)
      ? { requestId: `req-${++this.reqCount}`, args, ts: Date.now() }
      : undefined;
    if (caught) this.emit(entry, { type: 'caught', ...caught });
    const behavior: MockBehavior | undefined = caught ? { loading: true } : (entry.override ?? this.initialOf(entry));
    if (!behavior) return undefined;

    let settle!: (result: MockResult) => void;
    const result = new Promise<MockResult>((resolve) => (settle = resolve));
    const pending: Pending = { settle, caught };
    entry.pending.add(pending);
    entry.state.status = 'loading';
    this.apply(entry, pending, behavior);

    return {
      result,
      onProgress: (cb) => {
        pending.progress = cb;
      },
      cancel: () => {
        if (pending.timer !== undefined) clearTimeout(pending.timer);
        entry.pending.delete(pending);
      },
    };
  }

  private initialOf(entry: Entry): MockBehavior | undefined {
    return typeof entry.initial === 'function' ? entry.initial() : entry.initial;
  }

  private apply(entry: Entry, pending: Pending, behavior: MockBehavior | undefined): void {
    if (pending.timer !== undefined) clearTimeout(pending.timer);
    pending.timer = undefined;
    if (behavior?.progress?.length) {
      // The transport subscribes to progress only after `intercept()` returns, hence the microtask.
      const { progress, ...rest } = behavior;
      queueMicrotask(() => {
        if (!entry.pending.has(pending)) return;
        for (const step of progress) {
          entry.state.progress = step;
          pending.progress?.(step);
        }
        this.apply(entry, pending, rest as MockBehavior);
      });
      return;
    }
    if (!behavior) {
      this.finish(entry, pending, 'passthrough');
    } else if ('loading' in behavior) {
      // stays pending until the endpoint is resolved, failed or reset
    } else if (behavior.delay) {
      pending.timer = setTimeout(() => this.finish(entry, pending, toResponse(behavior, entry.meta)), behavior.delay);
    } else {
      this.finish(entry, pending, toResponse(behavior, entry.meta));
    }
  }

  private finish(entry: Entry, pending: Pending, result: MockResult): void {
    if (!entry.pending.delete(pending)) return;
    if (pending.timer !== undefined) clearTimeout(pending.timer);
    if (result === 'passthrough') {
      entry.state.status = 'idle';
    } else if (result.status >= 400) {
      // progress intentionally kept — shows where the transfer was when it failed
      entry.state.status = 'error';
      entry.state.error = result.value;
    } else {
      entry.state.status = 'resolved';
      entry.state.value = result.value;
      entry.state.error = undefined;
      entry.state.progress = undefined;
    }
    pending.settle(result);
  }

  /**
   * Stores `behavior` for future requests and delivers it now: to the requests currently held
   * open, or — when none is waiting — by re-running the live resources of the endpoint, so an
   * already loaded page shows the edit without a reload. Resources are only re-run while the
   * endpoint has a behavior: with none the request would go to the real API.
   */
  private setOverride(entry: Entry, behavior: MockBehavior | undefined): void {
    entry.override = behavior;
    if (entry.pending.size > 0) {
      for (const pending of [...entry.pending]) this.apply(entry, pending, behavior ?? this.initialOf(entry));
      if (behavior && 'loading' in behavior) entry.state.status = 'loading';
      return;
    }
    if (behavior !== undefined || entry.initial !== undefined) this.reloadLive(entry);
    // Nothing is waiting: the state shows what the next request will get (unknown for a function).
    const effective = behavior ?? (typeof entry.initial === 'function' ? undefined : entry.initial);
    if (effective && 'loading' in effective) {
      entry.state.status = 'loading';
    } else if (effective) {
      const response = toResponse(effective, entry.meta);
      entry.state.status = response.status >= 400 ? 'error' : 'resolved';
      if (response.status >= 400) entry.state.error = response.value;
      else {
        entry.state.value = response.value;
        entry.state.error = undefined;
      }
    }
  }

  private control(detail: ControlDetail): void {
    switch (detail.action) {
      case 'setCatchMode':   this.setCatchMode(detail.key, true);  return;
      case 'clearCatchMode': this.setCatchMode(detail.key, false); return;
      case 'unregister':     this.unregister(detail.key);          return;
      case 'register':
        if (detail.rule) this.registerConfigured({ key: detail.key, rule: detail.rule, meta: detail.meta, behavior: detail.behavior });
        return;
      case 'configure':
        this.configure(detail.config ?? {});
        return;
    }
    const entry = this.entries.get(detail.key);
    if (!entry) return;
    switch (detail.action) {
      case 'resolve':      this.setOverride(entry, { value: detail.value });                         break;
      case 'resolveAfter':
        this.setOverride(entry, { value: detail.value, delay: detail.delayMs ?? 0 });
        break;
      case 'reload':       this.reloadLive(entry);                                                   break;
      case 'setProgress':
        this.setProgress(entry, { type: detail.progressType ?? 'download', loaded: detail.loaded ?? 0, total: detail.total });
        break;
      case 'simulateProgress':
        this.simulateProgress(entry, detail.progressType ?? 'download', detail.total ?? 0, detail.delayMs ?? 1000, detail.value, detail.steps);
        break;
      case 'setLoading':   this.setOverride(entry, { loading: true });                               break;
      case 'fail':         this.setOverride(entry, { error: detail.value, status: detail.status });                         break;
      case 'reset':        this.reset(entry);                                                        break;
      case 'clearHistory': entry.history.length = 0;                                                 break;
    }
  }

  /** Reports transfer progress to the requests currently held open. */
  private setProgress(entry: Entry, progress: MockProgress): void {
    entry.state.progress = progress;
    entry.state.status = 'loading';
    for (const pending of entry.pending) pending.progress?.(progress);
    this.emit(entry, { type: 'progress', progressType: progress.type, loaded: progress.loaded, total: progress.total, ts: Date.now() });
  }

  private simulateProgress(
    entry: Entry,
    type: 'upload' | 'download',
    total: number,
    durationMs: number,
    value: unknown,
    steps = 10,
  ): void {
    const stepDelay = durationMs / steps;
    for (let i = 1; i <= steps; i++) {
      setTimeout(() => this.setProgress(entry, { type, loaded: Math.round((total / steps) * i), total }), stepDelay * i);
    }
    setTimeout(() => {
      this.setOverride(entry, { value });
      this.emit(entry, { type: 'resolve', value, ts: Date.now() });
    }, durationMs + stepDelay);
  }

  private reset(entry: Entry): void {
    entry.state.value = undefined;
    entry.state.error = undefined;
    entry.state.progress = undefined;
    entry.state.status = 'idle';
    this.setOverride(entry, undefined);
  }

  private emit(entry: Entry, event: MockEvent): void {
    entry.history.push(event);
    entry.listeners.forEach((cb) => cb(event));
    if (typeof document === 'undefined') return;
    const safe =
      event.type === 'request' || event.type === 'caught'
        ? { ...event, args: event.args.map(sanitizeArg) }
        : event;
    document.dispatchEvent(new CustomEvent('openapi-mock-event', { detail: { key: entry.key, event: safe } }));
  }

  private exposeToWindow(entry: Entry): void {
    entry.api = {
      resolve: (v) => {
        this.setOverride(entry, { value: v });
        this.emit(entry, { type: 'resolve', value: v, ts: Date.now() });
      },
      resolveAfter: (ms, v) => {
        this.setOverride(entry, { value: v, delay: ms });
        this.emit(entry, { type: 'loading', ts: Date.now() });
      },
      setLoading: () => {
        this.setOverride(entry, { loading: true });
        this.emit(entry, { type: 'loading', ts: Date.now() });
      },
      fail: (e, status) => {
        this.setOverride(entry, { error: e, status });
        this.emit(entry, { type: 'error', error: e, ts: Date.now() });
      },
      reset: () => {
        this.reset(entry);
        this.emit(entry, { type: 'reset', ts: Date.now() });
      },
      reload: () => {
        const reloaded = this.reloadLive(entry) > 0;
        if (reloaded) this.emit(entry, { type: 'reloading', ts: Date.now() });
        return reloaded;
      },
      setProgress: (type, loaded, total) => this.setProgress(entry, { type, loaded, total }),
      simulateProgress: (type, total, durationMs, v, steps) => {
        this.emit(entry, { type: 'loading', ts: Date.now() });
        this.simulateProgress(entry, type, total, durationMs, v, steps);
      },
      setCatchMode: (enabled) => this.setCatchMode(entry.key, enabled),
      getMeta: () => entry.meta,
      getState: () => {
        // The request catch mode is holding right now, for a tool that was not listening when it
        // was caught (the DevTools panel opened later).
        const held = [...entry.pending].reverse().find((pending) => pending.caught)?.caught;
        return held
          ? { ...entry.state, caught: { ...held, args: held.args.map(sanitizeArg) } }
          : { ...entry.state };
      },
      getHistory: () => [...entry.history],
      clearHistory: () => {
        entry.history.length = 0;
      },
      onEvent: (cb) => {
        entry.listeners.add(cb);
        return () => entry.listeners.delete(cb);
      },
    };
    if (typeof window === 'undefined') return;
    window.__openApiMocks__ ??= {};
    window.openApiMock ??= (k: string) => window.__openApiMocks__![k];
    window.__openApiMocks__[entry.key] = entry.api;
  }
}
