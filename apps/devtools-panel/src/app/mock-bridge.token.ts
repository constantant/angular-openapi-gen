import { InjectionToken, Signal, WritableSignal, signal } from '@angular/core';
import { MockEntry, MockState, PanelMessage, applyEvent, blankEntry } from './mock-entry';

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

    let port: chrome.runtime.Port;

    function onMessage(msg: PanelMessage): void {
      mocks.update((prev) => {
        const next = new Map(prev);
        if (msg.type === 'mock-keys') {
          for (const key of msg.keys) {
            if (!next.has(key)) next.set(key, blankEntry(key));
          }
        } else if (msg.type === 'mock-state') {
          const existing = next.get(msg.key) ?? blankEntry(msg.key);
          next.set(msg.key, { ...existing, state: msg.state as MockState });
        } else if (msg.type === 'mock-event') {
          const existing = next.get(msg.key);
          if (existing) next.set(msg.key, applyEvent(existing, msg.event));
        }
        return next;
      });
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
