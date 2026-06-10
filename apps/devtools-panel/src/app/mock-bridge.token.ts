import { InjectionToken, Signal, WritableSignal, inject, signal } from '@angular/core';
import { MockEntry, MockState, PanelMessage, applyEvent, blankEntry } from './mock-entry';
import { SPEC_STORE } from './spec-store.token';

export interface MockBridge {
  readonly mocks: Signal<ReadonlyMap<string, MockEntry>>;
  readonly selectedKey: WritableSignal<string | null>;
  sendControl(key: string, action: string, extra?: Record<string, unknown>): void;
  setCatchMode(key: string, enabled: boolean): void;
  refresh(): void;
  clearAll(): void;
  resetAll(): void;
  clearHistory(key: string): void;
}

export const MOCK_BRIDGE = new InjectionToken<MockBridge>('MOCK_BRIDGE', {
  providedIn: 'root',
  factory: () => {
    const mocks = signal<Map<string, MockEntry>>(new Map());
    const selectedKey = signal<string | null>(null);

    // Outside a Chrome DevTools panel (e.g. dev server, E2E) — return a passive stub.
    if (typeof chrome === 'undefined' || !chrome.devtools) {
      return {
        mocks: mocks.asReadonly(), selectedKey,
        sendControl: () => { /* noop */ },
        setCatchMode: () => { /* noop */ },
        refresh: () => { /* noop */ },
        clearAll: () => { /* noop */ },
        resetAll: () => { /* noop */ },
        clearHistory: () => { /* noop */ },
      };
    }

    const tabId = chrome.devtools.inspectedWindow.tabId;
    const specStore = inject(SPEC_STORE);

    let port: chrome.runtime.Port;

    function onMessage(msg: PanelMessage): void {
      mocks.update((prev) => {
        const next = new Map(prev);
        if (msg.type === 'mock-keys') {
          for (const key of msg.keys) {
            // Runtime meta (Phase 1) takes priority; fall back to SPEC_STORE (Phase 3).
            const runtimeMeta = msg.metas?.[key] ?? null;
            const meta = runtimeMeta ?? specStore.findMock(key) ?? null;
            if (!next.has(key)) {
              next.set(key, { ...blankEntry(key), meta });
            } else if (meta) {
              const existing = next.get(key);
              if (existing) next.set(key, { ...existing, meta });
            }
          }
        } else if (msg.type === 'mock-state') {
          const existing = next.get(msg.key) ?? blankEntry(msg.key);
          const newState = msg.state as MockState;
          // When the mock is no longer loading the user has responded — clear the
          // pending-request indicator so the CAUGHT badge goes away.
          const pendingRequest =
            newState.status === 'loading' || newState.status === 'reloading'
              ? existing.pendingRequest
              : null;
          next.set(msg.key, { ...existing, state: newState, pendingRequest });
        } else if (msg.type === 'mock-event') {
          const existing = next.get(msg.key);
          if (existing) next.set(msg.key, applyEvent(existing, msg.event));
        }
        return next;
      });

      // The page (and its MockResourceBus) reloads but the panel does not.
      // When the bus re-registers keys, re-send setCatchMode for every key the
      // panel was already watching — the fresh bus has an empty catchModeKeys set
      // and needs to be told which keys to intercept.
      if (msg.type === 'mock-keys') {
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
    }

    connect();

    function post(msg: unknown): void {
      try {
        port.postMessage(msg);
      } catch {
        // Port was disconnected mid-flight; reconnect and retry once.
        connect();
        try { port.postMessage(msg); } catch { /* give up */ }
      }
    }

    function sendControl(key: string, action: string, extra?: Record<string, unknown>): void {
      post({ type: 'control', detail: { key, action, ...extra } });
      setTimeout(() => post({ type: 'get-state', key }), 120);
    }

    return {
      mocks: mocks.asReadonly(),
      selectedKey,
      sendControl,
      setCatchMode: (key: string, enabled: boolean) => {
        mocks.update((prev) => {
          const entry = prev.get(key);
          if (!entry) return prev;
          const next = new Map(prev);
          next.set(key, { ...entry, catchMode: enabled, pendingRequest: enabled ? entry.pendingRequest : null });
          return next;
        });
        post({ type: 'control', detail: { key, action: enabled ? 'setCatchMode' : 'clearCatchMode' } });
      },
      refresh: () => post({ type: 'get-keys' }),
      clearAll: () => { mocks.set(new Map()); selectedKey.set(null); },
      resetAll: () => { for (const k of mocks().keys()) sendControl(k, 'reset'); },
      clearHistory: (key: string) => {
        mocks.update((prev) => {
          const entry = prev.get(key);
          if (!entry) return prev;
          const next = new Map(prev);
          next.set(key, { ...entry, history: [] });
          return next;
        });
      },
    };
  },
});
