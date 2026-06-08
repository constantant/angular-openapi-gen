import { signal, computed, Signal } from '@angular/core';
import type { ResourceStatus } from '@angular/core';

export type MockResourceState<T> =
  | { value: T }
  | { loading: true }
  | { error: unknown };

export interface MockResourceRef<T> {
  readonly value: Signal<T | undefined>;
  readonly status: Signal<ResourceStatus>;
  readonly error: Signal<unknown>;
  readonly isLoading: Signal<boolean>;
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
  onRequest(cb: (args: unknown[]) => void): () => void;
}

export interface MockResourceRefInternal<T> extends MockResourceRef<T> {
  _notifyRequest(args: unknown[]): void;
}

export function createMockResourceRef<T>(
  initialState?: MockResourceState<T>,
): MockResourceRef<T> {
  const _status = signal<ResourceStatus>('idle');
  const _value = signal<T | undefined>(undefined);
  const _error = signal<unknown>(undefined);
  const requestListeners = new Set<(args: unknown[]) => void>();

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
    value: _value.asReadonly(),
    status: _status.asReadonly(),
    error: _error.asReadonly(),
    isLoading: computed(
      () => _status() === 'loading' || _status() === 'reloading',
    ),
    hasValue: () => _value() !== undefined,

    resolve(v: T): void {
      _value.set(v);
      _error.set(undefined);
      _status.set('resolved');
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
      _status.set('error');
    },
    reset(): void {
      _value.set(undefined);
      _error.set(undefined);
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
    reload: () => false,
    destroy: () => {},
    asReadonly: () => ref,
    onRequest: (cb) => {
      requestListeners.add(cb);
      return () => requestListeners.delete(cb);
    },
    _notifyRequest: (args) => {
      requestListeners.forEach((cb) => cb(args));
    },
  };
  return ref;
}
