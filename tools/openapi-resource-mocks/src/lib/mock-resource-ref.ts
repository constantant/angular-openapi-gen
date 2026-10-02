import { signal, computed, Signal } from '@angular/core';
import type { ResourceStatus } from '@angular/core';
import type { MockProgress } from './mock-events';

export type MockResourceState<T> =
  | { value: T }
  | { loading: true }
  | { error: unknown };

export interface MockResourceRef<T> {
  readonly value: Signal<T | undefined>;
  readonly status: Signal<ResourceStatus>;
  readonly error: Signal<unknown>;
  readonly isLoading: Signal<boolean>;
  readonly progress: Signal<MockProgress | undefined>;
  readonly requestCount: Signal<number>;
  hasValue(): boolean;
  reload(): boolean;
  destroy(): void;
  set(value: T): void;
  update(updater: (value: T | undefined) => T): void;
  asReadonly(): MockResourceRef<T>;
  resolve(value: T): void;
  resolveAfter(delayMs: number, value: T): void;
  setLoading(): void;
  fail(error: unknown): void;
  reset(): void;
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  simulateProgress(
    type: 'upload' | 'download',
    totalBytes: number,
    durationMs: number,
    finalValue: T,
    steps?: number,
  ): void;
  onRequest(cb: (args: unknown[]) => void): () => void;
}

export interface MockResourceRefInternal<T> extends MockResourceRef<T> {
  _notifyRequest(args: unknown[]): void;
  /**
   * The `defaultValue` option of a call made with `--callOptions`: what `value()` returns while there
   * is no resolved value (idle, loading, error or after `reset()`), as the real httpResource does.
   */
  _setDefaultValue(value: T | undefined): void;
  /** Called synchronously on resolve() / fail(). Used by Observable-based mocks to emit. */
  _onSettle(cb: (outcome: { value: T } | { error: unknown }) => void): () => void;
  /** Called synchronously on setProgress() (and so on every simulateProgress() step). */
  _onProgress(cb: (progress: MockProgress) => void): () => void;
}

export function createMockResourceRef<T>(
  initialState?: MockResourceState<T>,
): MockResourceRef<T> {
  const _status = signal<ResourceStatus>('idle');
  const _value = signal<T | undefined>(undefined);
  const _default = signal<T | undefined>(undefined);
  const _error = signal<unknown>(undefined);
  const _progress = signal<MockProgress | undefined>(undefined);
  const _requestCount = signal(0);
  const requestListeners = new Set<(args: unknown[]) => void>();
  const settleListeners = new Set<(outcome: { value: T } | { error: unknown }) => void>();
  const progressListeners = new Set<(progress: MockProgress) => void>();

  if (initialState) {
    if ('value' in initialState) {
      _value.set(initialState.value);
      _status.set('resolved');
    } else if ('loading' in initialState) {
      _status.set('loading');
    } else if ('error' in initialState) {
      _error.set(initialState.error);
      _status.set('error');
    }
  }

  const ref: MockResourceRefInternal<T> = {
    value: computed(() => _value() ?? _default()),
    status: _status.asReadonly(),
    error: _error.asReadonly(),
    progress: _progress.asReadonly(),
    requestCount: _requestCount.asReadonly(),
    isLoading: computed(
      () => _status() === 'loading' || _status() === 'reloading',
    ),
    hasValue: () => _value() !== undefined,

    resolve(v: T): void {
      _value.set(v);
      _error.set(undefined);
      _progress.set(undefined);
      _status.set('resolved');
      settleListeners.forEach((cb) => cb({ value: v }));
    },
    resolveAfter(ms: number, v: T): void {
      ref.setLoading();
      setTimeout(() => ref.resolve(v), ms);
    },
    setLoading(): void {
      _error.set(undefined);
      _status.set('loading');
    },
    fail(e: unknown): void {
      _error.set(e);
      // progress intentionally kept — shows where transfer was when it failed
      _status.set('error');
      settleListeners.forEach((cb) => cb({ error: e }));
    },
    reset(): void {
      _value.set(undefined);
      _error.set(undefined);
      _progress.set(undefined);
      _status.set('idle');
    },
    set(v: T): void {
      _value.set(v);
      _status.set('local');
    },
    update(fn: (v: T | undefined) => T): void {
      _value.update(fn);
      _status.set('local');
    },
    setProgress(type: 'upload' | 'download', loaded: number, total?: number): void {
      const progress: MockProgress = { type, loaded, total };
      _progress.set(progress);
      _status.set('loading');
      progressListeners.forEach((cb) => cb(progress));
    },
    simulateProgress(
      type: 'upload' | 'download',
      totalBytes: number,
      durationMs: number,
      finalValue: T,
      steps = 10,
    ): void {
      ref.setLoading();
      const stepDelay = durationMs / steps;
      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          ref.setProgress(type, Math.round((totalBytes / steps) * i), totalBytes);
        }, stepDelay * i);
      }
      setTimeout(() => ref.resolve(finalValue), durationMs + stepDelay);
    },
    reload: () => {
      const cur = _status();
      if (cur !== 'resolved' && cur !== 'local') return false;
      _error.set(undefined);
      _status.set('reloading'); // value intentionally kept
      ref._notifyRequest([]); // fires bus onRequest → 'request' event + catch mode
      return true;
    },
    destroy: () => { /* no-op: signals are not subscriptions */ },
    asReadonly: () => ref,
    onRequest: (cb) => {
      requestListeners.add(cb);
      return () => requestListeners.delete(cb);
    },
    _setDefaultValue: (v) => _default.set(v),
    _onProgress: (cb) => {
      progressListeners.add(cb);
      return () => progressListeners.delete(cb);
    },
    _onSettle: (cb) => {
      settleListeners.add(cb);
      return () => settleListeners.delete(cb);
    },
    _notifyRequest: (rawArgs) => {
      _requestCount.update((n) => n + 1);
      const args = rawArgs.map((arg) =>
        typeof arg === 'function' ? (arg as () => unknown)() : arg,
      );
      requestListeners.forEach((cb) => cb(args));
    },
  };
  return ref;
}
