import { InjectionToken, Signal, WritableSignal, effect, inject, signal, untracked } from '@angular/core';
import { MockEntry, MockResourceMeta, MockState, ObservedRequest, PanelMessage, applyEvent, blankEntry } from './mock-entry';
import { findOperation } from './base-url-suggestions';
import { SPEC_STORE } from './spec-store.token';

export interface MockBridge {
  readonly mocks: Signal<ReadonlyMap<string, MockEntry>>;
  readonly selectedKey: WritableSignal<string | null>;
  /** Whether fetch / XMLHttpRequest are patched by the extension on the inspected site. */
  readonly intercepting: Signal<boolean>;
  /** Opt the inspected site in or out of interception (persists across reloads and sessions). */
  setIntercepting(enabled: boolean): void;
  /** Distinct requests the page made since interception started; filled by {@link refreshObserved}. */
  readonly observedRequests: Signal<readonly ObservedRequest[]>;
  /** Ask the page for its observed requests (used to suggest a base URL for a spec). */
  refreshObserved(): void;
  sendControl(key: string, action: string, extra?: Record<string, unknown>): void;
  setCatchMode(key: string, enabled: boolean): void;
  refresh(): void;
  clearAll(): void;
  resetAll(): void;
  clearHistory(key: string): void;
  createLocalMock(key: string, meta: MockResourceMeta): void;
  deleteLocalMock(key: string): void;
}

export const MOCK_BRIDGE = new InjectionToken<MockBridge>('MOCK_BRIDGE', {
  providedIn: 'root',
  factory: () => {
    const mocks = signal<Map<string, MockEntry>>(new Map());
    const selectedKey = signal<string | null>(null);
    const intercepting = signal(false);
    const observedRequests = signal<readonly ObservedRequest[]>([]);

    // Outside a Chrome DevTools panel (e.g. dev server, E2E) — return a passive stub.
    if (typeof chrome === 'undefined' || !chrome.devtools) {
      return {
        mocks: mocks.asReadonly(), selectedKey,
        intercepting: intercepting.asReadonly(),
        setIntercepting: () => { /* noop */ },
        observedRequests: observedRequests.asReadonly(),
        refreshObserved: () => { /* noop */ },
        sendControl: () => { /* noop */ },
        setCatchMode: () => { /* noop */ },
        refresh: () => { /* noop */ },
        clearAll: () => { /* noop */ },
        resetAll: () => { /* noop */ },
        clearHistory: () => { /* noop */ },
        createLocalMock: () => { /* noop */ },
        deleteLocalMock: () => { /* noop */ },
      };
    }

    const tabId = chrome.devtools.inspectedWindow.tabId;
    const specStore = inject(SPEC_STORE);
    const LOCAL_MOCKS_KEY = 'oarm_local_mocks';

    interface StoredMock {
      meta: MockResourceMeta;
      catchMode?: boolean;
      baseUrl?: string;
      /** The behavior last set from the panel; the extension re-applies it on every page load. */
      override?: unknown;
    }

    // What was last set on each managed endpoint (resolve / fail / loading). Kept beside the
    // entries because it is the *configuration* of the mock, not the state the page reports.
    const overrides = new Map<string, unknown>();
    let storageLoaded = false;
    // Auto-listed endpoints the user removed: not listed again until the panel is reopened.
    const dismissed = new Set<string>();

    // The spec's current base URL wins, so one set (or corrected) on the Specs tab after the mock
    // was created still applies; the stored copy covers a spec that was removed since.
    function baseUrlOf(entry: MockEntry): string | undefined {
      return (entry.meta && specStore.specs().get(entry.meta.specId)?.baseUrl) ?? entry.baseUrl;
    }

    // Managed endpoints are persisted whether or not the page has them right now: the service
    // worker reads this record at document start to register them before the app's first request.
    function persistLocalMocks(map: Map<string, MockEntry>): void {
      if (!storageLoaded) return; // writing before the stored endpoints were read would wipe them
      const out: Record<string, StoredMock> = {};
      for (const [key, entry] of map) {
        if (!entry.managed || !entry.meta) continue;
        out[key] = { meta: entry.meta, catchMode: entry.catchMode, baseUrl: baseUrlOf(entry), override: overrides.get(key) };
      }
      chrome.storage.local.set({ [LOCAL_MOCKS_KEY]: out });
    }

    function registerInPage(entry: MockEntry): void {
      const baseUrl = baseUrlOf(entry);
      if (!entry.meta || !baseUrl) return;
      post({
        type: 'control',
        detail: {
          key: entry.key,
          action: 'register',
          rule: { method: entry.meta.method, baseUrl, path: entry.meta.path },
          meta: entry.meta,
          behavior: overrides.get(entry.key),
        },
      });
    }

    function rememberOverride(key: string, action: string, extra?: Record<string, unknown>): void {
      if (!mocks().get(key)?.managed) return;
      switch (action) {
        case 'resolve':
        case 'simulateProgress': overrides.set(key, { value: extra?.['value'] }); break;
        case 'resolveAfter':     overrides.set(key, { value: extra?.['value'], delay: extra?.['delayMs'] }); break;
        case 'fail':             overrides.set(key, { error: extra?.['value'], status: extra?.['status'] }); break;
        case 'setLoading':       overrides.set(key, { loading: true }); break;
        case 'reset':            overrides.delete(key); break;
        default: return;
      }
      persistLocalMocks(mocks());
    }

    let port: chrome.runtime.Port;

    function onMessage(msg: PanelMessage): void {
      if (msg.type === 'intercept-state') {
        intercepting.set(msg.enabled);
        // What the page requested before the panel was listening.
        if (msg.enabled) post({ type: 'get-observed' });
        return;
      }
      if (msg.type === 'observed-requests' || msg.type === 'observed-request') {
        const incoming = msg.type === 'observed-requests' ? msg.requests : [msg.request];
        observedRequests.update((prev) => {
          const known = new Set(prev.map((r) => `${r.method} ${r.url}`));
          const added = incoming.filter((r) => !known.has(`${r.method} ${r.url}`));
          return added.length > 0 ? [...prev, ...added] : prev;
        });
        return;
      }
      mocks.update((prev) => {
        const next = new Map(prev);
        if (msg.type === 'mock-keys') {
          for (const key of msg.keys) {
            // Runtime meta (Phase 1) takes priority; fall back to SPEC_STORE (Phase 3).
            const runtimeMeta = msg.metas?.[key] ?? null;
            const meta = runtimeMeta ?? specStore.findMock(key) ?? null;
            const existing = next.get(key);
            if (!existing) {
              next.set(key, { ...blankEntry(key), meta });
            } else if (existing.state.status === 'local') {
              // Entry was panel-created; the app has now registered the key — promote it.
              next.set(key, { ...existing, state: { status: 'idle', value: undefined, error: undefined, progress: undefined }, meta: meta ?? existing.meta });
            } else if (meta) {
              next.set(key, { ...existing, meta });
            }
          }
          persistLocalMocks(next);
        } else if (msg.type === 'mock-state') {
          const existing = next.get(msg.key) ?? blankEntry(msg.key);
          const newState = msg.state as MockState;
          // When the mock is no longer loading the user has responded — clear the
          // pending-request indicator so the CAUGHT badge goes away.
          // A request caught before the panel was listening (it was opened later, or the page
          // was faster) arrives with the state instead of as a `caught` event.
          const pendingRequest =
            newState.status === 'loading' || newState.status === 'reloading'
              ? (existing.pendingRequest ?? newState.caught ?? null)
              : null;
          // A fresh page reports no value; what an earlier one answered stays as the example.
          const example = newState.status === 'resolved' && newState.value !== undefined ? newState.value : existing.example;
          next.set(msg.key, { ...existing, state: newState, pendingRequest, example });
        } else if (msg.type === 'mock-event') {
          const existing = next.get(msg.key);
          if (existing) next.set(msg.key, applyEvent(existing, msg.event));
        }
        return next;
      });

      // The page (and its mock runtime) reloads but the panel does not.
      // When the runtime re-registers keys, re-send setCatchMode for every key the
      // panel was already watching — the fresh runtime has an empty catchModeKeys set
      // and needs to be told which keys to intercept.
      if (msg.type === 'mock-keys') {
        // A page whose runtime does not have a managed endpoint yet (it was created while another
        // page was open, or the runtime comes from the app bundle): register it now.
        const missing = [...mocks().values()].filter((e) => e.managed && baseUrlOf(e) && !msg.keys.includes(e.key));
        if (missing.length > 0) {
          missing.forEach(registerInPage);
          setTimeout(() => post({ type: 'get-keys' }), 150);
        }
        for (const key of msg.keys) {
          if (mocks().get(key)?.catchMode) {
            post({ type: 'control', detail: { key, action: 'setCatchMode' } });
          }
        }
      }
    }

    function connect(): void {
      port = chrome.runtime.connect({ name: `devtools-${tabId}` });
      port.onMessage.addListener(onMessage);
      // SW suspended by Chrome → port disconnects. Reconnect transparently.
      port.onDisconnect.addListener(() => connect());
      port.postMessage({ type: 'get-keys' });
      port.postMessage({ type: 'get-intercept' });
    }

    connect();

    chrome.storage.local.get(LOCAL_MOCKS_KEY, (res) => {
      storageLoaded = true;
      const stored = res[LOCAL_MOCKS_KEY];
      if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
        mocks.update((prev) => {
          const next = new Map(prev);
          for (const [key, v] of Object.entries(stored as Record<string, StoredMock>)) {
            if (!v.meta) continue;
            if (v.override !== undefined) overrides.set(key, v.override);
            const existing = next.get(key);
            if (existing) {
              // The page reported the key before storage answered.
              next.set(key, { ...existing, managed: true, baseUrl: v.baseUrl, catchMode: existing.catchMode || (v.catchMode ?? false) });
            } else {
              next.set(key, { ...blankEntry(key), state: { status: 'local', value: undefined, error: undefined, progress: undefined }, meta: v.meta, catchMode: v.catchMode ?? false, managed: true, baseUrl: v.baseUrl });
            }
          }
          return next;
        });
      }
    });

    function post(msg: unknown): void {
      try {
        port.postMessage(msg);
      } catch {
        // Port was disconnected mid-flight; reconnect and retry once.
        connect();
        try { port.postMessage(msg); } catch { /* give up */ }
      }
    }

    // On an intercepted site, every operation of an imported spec that the page is seen requesting
    // is listed as a panel-managed mock, so nothing has to be created by hand. Such an endpoint has
    // no response yet: its requests keep reaching the real API until one is set or it is caught.
    effect(() => {
      const observed = observedRequests();
      const specs = specStore.specs();
      if (!intercepting() || observed.length === 0) return;
      untracked(() => {
        if (!storageLoaded) return;
        const known = mocks();
        const found = new Map<string, MockEntry>();
        for (const spec of specs.values()) {
          if (spec.baseUrl === undefined) continue;
          for (const request of observed) {
            const operation = findOperation(spec.mocks, spec.baseUrl, request);
            if (!operation) continue;
            const key = operation.tokenName;
            if (known.has(key) || found.has(key) || dismissed.has(key)) continue;
            found.set(key, {
              ...blankEntry(key),
              state: { status: 'local', value: undefined, error: undefined, progress: undefined },
              meta: { specId: spec.specId, operationId: operation.operationId, path: operation.path, method: operation.method, tag: operation.tag },
              managed: true,
              baseUrl: spec.baseUrl,
            });
          }
        }
        if (found.size === 0) return;
        mocks.update((prev) => new Map([...prev, ...found]));
        persistLocalMocks(mocks());
        for (const entry of found.values()) registerInPage(entry);
        setTimeout(() => post({ type: 'get-keys' }), 150);
      });
    });

    // A base URL edited on the Specs tab reaches the stored endpoints (read by the service worker at
    // the next page load) and the open page.
    effect(() => {
      specStore.specs();
      untracked(() => {
        persistLocalMocks(mocks());
        post({ type: 'get-keys' });
      });
    });

    function sendControl(key: string, action: string, extra?: Record<string, unknown>): void {
      rememberOverride(key, action, extra);
      post({ type: 'control', detail: { key, action, ...extra } });
      setTimeout(() => post({ type: 'get-state', key }), 120);
    }

    return {
      mocks: mocks.asReadonly(),
      selectedKey,
      intercepting: intercepting.asReadonly(),
      setIntercepting: (enabled: boolean) => post({ type: 'set-intercept', enabled }),
      observedRequests: observedRequests.asReadonly(),
      refreshObserved: () => post({ type: 'get-observed' }),
      sendControl,
      setCatchMode: (key: string, enabled: boolean) => {
        mocks.update((prev) => {
          const entry = prev.get(key);
          if (!entry) return prev;
          const next = new Map(prev);
          next.set(key, { ...entry, catchMode: enabled, pendingRequest: enabled ? entry.pendingRequest : null });
          return next;
        });
        persistLocalMocks(mocks());
        post({ type: 'control', detail: { key, action: enabled ? 'setCatchMode' : 'clearCatchMode' } });
      },
      refresh: () => post({ type: 'get-keys' }),
      clearAll: () => {
        // Mocks the app registered are only forgotten by the panel (discovery lists them again).
        // Mocks created in the panel are kept: the table is where they are stored from, so dropping
        // them here would silently delete them for good.
        mocks.update((prev) => {
          const next = new Map<string, MockEntry>();
          for (const [key, entry] of prev) {
            if (entry.managed) next.set(key, { ...entry, history: [], lastEventType: null, lastEventTs: null });
          }
          return next;
        });
        if (!mocks().has(selectedKey() ?? '')) selectedKey.set(null);
      },
      resetAll: () => { for (const k of mocks().keys()) sendControl(k, 'reset'); },
      clearHistory: (key: string) => {
        mocks.update((prev) => {
          const entry = prev.get(key);
          if (!entry) return prev;
          const next = new Map(prev);
          next.set(key, { ...entry, history: [] });
          return next;
        });
        post({ type: 'control', detail: { key, action: 'clearHistory' } });
      },
      createLocalMock: (key: string, meta: MockResourceMeta) => {
        const baseUrl = specStore.specs().get(meta.specId)?.baseUrl;
        const entry: MockEntry = { ...blankEntry(key), state: { status: 'local', value: undefined, error: undefined, progress: undefined }, meta, managed: true, baseUrl };
        mocks.update((prev) => {
          const next = new Map(prev);
          next.set(key, entry);
          return next;
        });
        selectedKey.set(key);
        persistLocalMocks(mocks());
        // With a runtime in the page (interception on, or an app that bundles the mocks) the
        // endpoint goes live right away; discovery then promotes the entry.
        registerInPage(entry);
        setTimeout(() => post({ type: 'get-keys' }), 150);
      },
      deleteLocalMock: (key: string) => {
        mocks.update((prev) => {
          const entry = prev.get(key);
          if (!entry?.managed) return prev;
          const next = new Map(prev);
          next.delete(key);
          return next;
        });
        if (mocks().has(key)) return; // not a managed entry: the app owns it
        dismissed.add(key);
        overrides.delete(key);
        if (selectedKey() === key) selectedKey.set(null);
        persistLocalMocks(mocks());
        post({ type: 'control', detail: { key, action: 'unregister' } });
      },
    };
  },
});
