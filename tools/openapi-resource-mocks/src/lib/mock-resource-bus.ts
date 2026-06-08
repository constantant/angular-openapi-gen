import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import type { MockResourceRef, MockResourceRefInternal } from './mock-resource-ref';
import type { MockEvent } from './mock-events';

export interface WindowMockEntry {
  resolve(value: unknown): void;
  resolveAfter(delayMs: number, value: unknown): void;
  setLoading(): void;
  fail(error: unknown): void;
  reset(): void;
  getState(): { status: string; value: unknown; error: unknown };
  getHistory(): MockEvent[];
  onEvent(cb: (event: MockEvent) => void): () => void;
}

declare global {
  interface Window {
    __openApiMocks__?: Record<string, WindowMockEntry>;
  }
}

export class MockResourceBus {
  private readonly refs = new Map<string, MockResourceRefInternal<unknown>>();

  register<T>(key: string, ref: MockResourceRef<T>): void {
    const internal = ref as MockResourceRefInternal<T>;
    this.refs.set(key, internal as MockResourceRefInternal<unknown>);
    this.exposeToWindow(key, internal);
  }

  get<T>(key: string): MockResourceRef<T> | undefined {
    return this.refs.get(key) as MockResourceRef<T> | undefined;
  }

  private exposeToWindow<T>(key: string, ref: MockResourceRefInternal<T>): void {
    window.__openApiMocks__ ??= {};
    const history: MockEvent[] = [];
    const listeners = new Set<(e: MockEvent) => void>();

    const emit = (e: MockEvent): void => {
      history.push(e);
      listeners.forEach((cb) => cb(e));
      this.dispatchDomEvent(key, e);
    };

    ref.onRequest((args) => emit({ type: 'request', args, ts: Date.now() }));

    window.__openApiMocks__[key] = {
      resolve:      (v)     => { ref.resolve(v as T); emit({ type: 'resolve', value: v, ts: Date.now() }); },
      resolveAfter: (ms, v) => { ref.resolveAfter(ms, v as T); },
      setLoading:   ()      => { ref.setLoading();    emit({ type: 'loading', ts: Date.now() }); },
      fail:         (e)     => { ref.fail(e);         emit({ type: 'error', error: e, ts: Date.now() }); },
      reset:        ()      => { ref.reset();         emit({ type: 'reset', ts: Date.now() }); },
      getState:     ()      => ({ status: String(ref.status()), value: ref.value(), error: ref.error() }),
      getHistory:   ()      => [...history],
      onEvent:      (cb)    => { listeners.add(cb); return () => listeners.delete(cb); },
    };
  }

  private dispatchDomEvent(key: string, event: MockEvent): void {
    if (typeof document === 'undefined') return;
    document.dispatchEvent(
      new CustomEvent('openapi-mock-event', { detail: { key, event } }),
    );
  }

  constructor() {
    if (typeof document === 'undefined') return;
    document.addEventListener('openapi-mock-control', (e: Event) => {
      const { key, action, value, delayMs } = (
        e as CustomEvent<{ key: string; action: string; value?: unknown; delayMs?: number }>
      ).detail;
      const ref = this.refs.get(key);
      if (!ref) return;
      switch (action) {
        case 'resolve':      ref.resolve(value);                    break;
        case 'resolveAfter': ref.resolveAfter(delayMs ?? 0, value); break;
        case 'setLoading':   ref.setLoading();                      break;
        case 'fail':         ref.fail(value);                       break;
        case 'reset':        ref.reset();                           break;
      }
    });
  }
}

export function provideMockResourceBus(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: MockResourceBus, useFactory: () => new MockResourceBus() },
  ]);
}
