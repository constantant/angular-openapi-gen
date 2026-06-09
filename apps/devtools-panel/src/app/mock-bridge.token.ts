import { InjectionToken, Signal, WritableSignal, signal } from '@angular/core';
import { MockEntry, MockState, PanelMessage, applyEvent, blankEntry } from './mock-entry';

export interface MockBridge {
  readonly mocks: Signal<ReadonlyMap<string, MockEntry>>;
  readonly selectedKey: WritableSignal<string | null>;
  sendControl(key: string, action: string, extra?: Record<string, unknown>): void;
  refresh(): void;
  clearAll(): void;
  resetAll(): void;
}

export const MOCK_BRIDGE = new InjectionToken<MockBridge>('MOCK_BRIDGE', {
  providedIn: 'root',
  factory: () => {
    const mocks = signal<Map<string, MockEntry>>(new Map());
    const selectedKey = signal<string | null>(null);

    const tabId = chrome.devtools.inspectedWindow.tabId;
    const port = chrome.runtime.connect({ name: `devtools-${tabId}` });

    port.onMessage.addListener((msg: PanelMessage) => {
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
    });

    port.postMessage({ type: 'get-keys' });

    function sendControl(key: string, action: string, extra?: Record<string, unknown>): void {
      port.postMessage({ type: 'control', detail: { key, action, ...extra } });
      setTimeout(() => port.postMessage({ type: 'get-state', key }), 120);
    }

    return {
      mocks: mocks.asReadonly(),
      selectedKey,
      sendControl,
      refresh: () => port.postMessage({ type: 'get-keys' }),
      clearAll: () => { mocks.set(new Map()); selectedKey.set(null); },
      resetAll: () => { for (const k of mocks().keys()) sendControl(k, 'reset'); },
    };
  },
});
