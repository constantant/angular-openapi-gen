import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import type { MockResourceRef, MockResourceRefInternal } from './mock-resource-ref';
import type { MockEvent } from './mock-events';

export interface WindowMockEntry {
  resolve(value: unknown): void;
  resolveAfter(delayMs: number, value: unknown): void;
  setLoading(): void;
  fail(error: unknown): void;
  reset(): void;
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  simulateProgress(
    type: 'upload' | 'download',
    totalBytes: number,
    durationMs: number,
    finalValue: unknown,
    steps?: number,
  ): void;
  setCatchMode(enabled: boolean): void;
  getState(): { status: string; value: unknown; error: unknown; progress: unknown };
  getHistory(): MockEvent[];
  onEvent(cb: (event: MockEvent) => void): () => void;
}

declare global {
  interface Window {
    __openApiMocks__?: Record<string, WindowMockEntry>;
    openApiMock?: (key: string) => WindowMockEntry;
  }
}

export class MockResourceBus {
  private readonly refs = new Map<string, MockResourceRefInternal<unknown>>();
  private readonly catchModeKeys = new Set<string>();
  private _reqCount = 0;

  register<T>(key: string, ref: MockResourceRef<T>): void {
    const internal = ref as MockResourceRefInternal<T>;
    this.refs.set(key, internal as MockResourceRefInternal<unknown>);
    this.exposeToWindow(key, internal);
  }

  get<T>(key: string): MockResourceRef<T> | undefined {
    return this.refs.get(key) as MockResourceRef<T> | undefined;
  }

  setCatchMode(key: string, enabled: boolean): void {
    if (enabled) {
      this.catchModeKeys.add(key);
      const ref = this.refs.get(key);
      if (ref) {
        ref.setLoading();
        this.dispatchDomEvent(key, { type: 'caught', args: [], requestId: this.nextReqId(), ts: Date.now() });
      }
    } else {
      this.catchModeKeys.delete(key);
    }
  }

  private nextReqId(): string {
    return `req-${++this._reqCount}`;
  }

  private exposeToWindow<T>(key: string, ref: MockResourceRefInternal<T>): void {
    window.__openApiMocks__ ??= {};
    window.openApiMock ??= (k: string) => window.__openApiMocks__![k];
    const history: MockEvent[] = [];
    const listeners = new Set<(e: MockEvent) => void>();

    const emit = (e: MockEvent): void => {
      history.push(e);
      listeners.forEach((cb) => cb(e));
      this.dispatchDomEvent(key, e);
    };

    ref.onRequest((args) => {
      emit({ type: 'request', args, ts: Date.now() });
      if (this.catchModeKeys.has(key)) {
        ref.setLoading();
        emit({ type: 'caught', args, requestId: this.nextReqId(), ts: Date.now() });
      }
    });

    window.__openApiMocks__[key] = {
      resolve:      (v)        => { ref.resolve(v as T); emit({ type: 'resolve', value: v, ts: Date.now() }); },
      resolveAfter: (ms, v)    => { ref.resolveAfter(ms, v as T); },
      setLoading:   ()         => { ref.setLoading();   emit({ type: 'loading', ts: Date.now() }); },
      fail:         (e)        => { ref.fail(e);        emit({ type: 'error', error: e, ts: Date.now() }); },
      reset:        ()         => { ref.reset();        emit({ type: 'reset', ts: Date.now() }); },
      setProgress:  (pt, l, t) => {
        ref.setProgress(pt, l, t);
        emit({ type: 'progress', progressType: pt, loaded: l, total: t, ts: Date.now() });
      },
      simulateProgress: (pt, total, dur, v, steps) => {
        ref.simulateProgress(pt, total, dur, v as T, steps);
      },
      setCatchMode: (enabled) => this.setCatchMode(key, enabled),
      getState:  () => ({
        status: String(ref.status()),
        value: ref.value(),
        error: ref.error(),
        progress: ref.progress(),
      }),
      getHistory: ()  => [...history],
      onEvent:    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
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
      const detail = (
        e as CustomEvent<{
          key: string;
          action: string;
          value?: unknown;
          delayMs?: number;
          progressType?: 'upload' | 'download';
          loaded?: number;
          total?: number;
          steps?: number;
        }>
      ).detail;
      const ref = this.refs.get(detail.key);
      switch (detail.action) {
        case 'setCatchMode':   this.setCatchMode(detail.key, true);  return;
        case 'clearCatchMode': this.setCatchMode(detail.key, false); return;
      }
      if (!ref) return;
      switch (detail.action) {
        case 'resolve':          ref.resolve(detail.value);                              break;
        case 'resolveAfter':     ref.resolveAfter(detail.delayMs ?? 0, detail.value);    break;
        case 'setLoading':       ref.setLoading();                                       break;
        case 'fail':             ref.fail(detail.value);                                 break;
        case 'reset': {
          ref.reset();
          // If catch mode is still on, immediately re-intercept the resource.
          if (this.catchModeKeys.has(detail.key)) {
            ref.setLoading();
            this.dispatchDomEvent(detail.key, {
              type: 'caught', args: [], requestId: this.nextReqId(), ts: Date.now(),
            });
          }
          break;
        }
        case 'setProgress':      ref.setProgress(detail.progressType!, detail.loaded!, detail.total); break;
        case 'simulateProgress': ref.simulateProgress(
                                   detail.progressType!,
                                   detail.total!,
                                   detail.delayMs ?? 1000,
                                   detail.value,
                                   detail.steps,
                                 );                                                      break;
      }
    });
  }
}

export function provideMockResourceBus(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: MockResourceBus, useFactory: () => new MockResourceBus() },
  ]);
}
