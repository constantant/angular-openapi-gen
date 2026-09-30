import { describe, it, expect, vi } from 'vitest';
import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import { mockResource, mockObservable } from './testing';

type FakeFn = (...args: unknown[]) => unknown;
const TOKEN = new InjectionToken<FakeFn>('TEST_TOKEN');

describe('mockResource', () => {
  describe('FactoryProvider shape', () => {
    it('provide field matches the token', () => {
      const handle = mockResource(TOKEN as never);
      expect(handle.provide).toBe(TOKEN);
    });

    it('useFactory returns a function', () => {
      const handle = mockResource(TOKEN as never);
      const factory = handle.useFactory!() as FakeFn;
      expect(typeof factory).toBe('function');
    });

    it('can be spread into providers array (structural compatibility)', () => {
      const handle = mockResource(TOKEN as never);
      // Simulate what Angular does: pick provide + useFactory
      const provider = { provide: handle.provide, useFactory: handle.useFactory };
      expect(provider.provide).toBe(TOKEN);
      expect(typeof provider.useFactory).toBe('function');
    });
  });

  describe('initial behavior', () => {
    it('ref starts idle when no initialBehavior given', () => {
      const handle = mockResource(TOKEN as never);
      expect(handle.ref.status()).toBe('idle');
    });

    it('{ value } resolves the ref immediately', () => {
      const handle = mockResource<string[]>(TOKEN as never, { value: ['a', 'b'] });
      expect(handle.ref.status()).toBe('resolved');
      expect(handle.ref.value()).toEqual(['a', 'b']);
    });

    it('{ loading: true } puts ref in loading state', () => {
      const handle = mockResource(TOKEN as never, { loading: true });
      expect(handle.ref.status()).toBe('loading');
      expect(handle.ref.isLoading()).toBe(true);
    });

    it('{ error } puts ref in error state', () => {
      const err = new Error('network fail');
      const handle = mockResource(TOKEN as never, { error: err });
      expect(handle.ref.status()).toBe('error');
      expect(handle.ref.error()).toBe(err);
    });

    it('{ value, delay } sets loading immediately then resolves after delay', () => {
      vi.useFakeTimers();
      const handle = mockResource<number>(TOKEN as never, { value: 42, delay: 200 });
      expect(handle.ref.isLoading()).toBe(true);
      vi.advanceTimersByTime(200);
      expect(handle.ref.status()).toBe('resolved');
      expect(handle.ref.value()).toBe(42);
      vi.useRealTimers();
    });
  });

  describe('call tracking', () => {
    it('calls starts empty', () => {
      const handle = mockResource(TOKEN as never);
      expect(handle.calls).toHaveLength(0);
    });

    it('records args each time the factory function is called', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ status: 'active' });
      fn({ status: 'sold' });
      expect(handle.calls).toHaveLength(2);
      expect(handle.calls[0]).toEqual([{ status: 'active' }]);
      expect(handle.calls[1]).toEqual([{ status: 'sold' }]);
    });

    it('returns the same ref every call', () => {
      const handle = mockResource<string>(TOKEN as never, { value: 'hello' });
      const fn = handle.useFactory!() as FakeFn;
      const r1 = fn();
      const r2 = fn('param');
      expect(r1).toBe(r2);
      expect(r1).toBe(handle.ref);
    });
  });

  describe('expectCalled', () => {
    it('throws when no calls recorded', () => {
      const handle = mockResource(TOKEN as never);
      expect(() => handle.expectCalled()).toThrow('never called');
    });

    it('does not throw when at least one call recorded', () => {
      const handle = mockResource(TOKEN as never);
      (handle.useFactory!() as FakeFn)();
      expect(() => handle.expectCalled()).not.toThrow();
    });
  });

  describe('expectCalledWith', () => {
    it('does not throw when a matching call exists', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ status: 'active' });
      expect(() => handle.expectCalledWith({ status: 'active' })).not.toThrow();
    });

    it('throws when no call matches', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ status: 'pending' });
      expect(() => handle.expectCalledWith({ status: 'active' })).toThrow('actual calls');
    });

    it('matches across multiple recorded calls', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ status: 'pending' });
      fn({ status: 'active' });
      expect(() => handle.expectCalledWith({ status: 'active' })).not.toThrow();
    });

    it('deep-equality: nested objects match', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ filter: { tags: ['cat', 'dog'], limit: 10 } });
      expect(() =>
        handle.expectCalledWith({ filter: { tags: ['cat', 'dog'], limit: 10 } }),
      ).not.toThrow();
    });

    it('deep-equality: different nested value does not match', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn({ filter: { tags: ['cat'], limit: 10 } });
      expect(() =>
        handle.expectCalledWith({ filter: { tags: ['cat', 'dog'], limit: 10 } }),
      ).toThrow();
    });

    it('matches multi-arg calls', () => {
      const handle = mockResource(TOKEN as never);
      const fn = handle.useFactory!() as FakeFn;
      fn('pathId', { query: 1 });
      expect(() => handle.expectCalledWith('pathId', { query: 1 })).not.toThrow();
      expect(() => handle.expectCalledWith('pathId', { query: 2 })).toThrow();
    });
  });

  describe('mid-test ref manipulation', () => {
    it('resolve() on ref changes state for subsequent reads', () => {
      const handle = mockResource<string>(TOKEN as never);
      handle.ref.resolve('hello');
      expect(handle.ref.value()).toBe('hello');
      expect(handle.ref.status()).toBe('resolved');
    });

    it('fail() on ref transitions to error state', () => {
      const handle = mockResource<string>(TOKEN as never, { value: 'ok' });
      handle.ref.fail(new Error('boom'));
      expect(handle.ref.status()).toBe('error');
    });
  });

  describe('response sequence', () => {
    it('applies first entry on initial factory call', () => {
      const handle = mockResource<string[]>(TOKEN as never, {
        sequence: [{ value: ['a'] }, { value: ['b'] }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn();
      expect(handle.ref.status()).toBe('resolved');
      expect(handle.ref.value()).toEqual(['a']);
    });

    it('advances to the next entry on each factory call', () => {
      const handle = mockResource<string[]>(TOKEN as never, {
        sequence: [{ value: ['first'] }, { value: ['second'] }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn();
      expect(handle.ref.value()).toEqual(['first']);
      fn();
      expect(handle.ref.value()).toEqual(['second']);
    });

    it('also advances on reload() when in resolved state', () => {
      const handle = mockResource<string[]>(TOKEN as never, {
        sequence: [{ value: ['v1'] }, { value: ['v2'] }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn();
      expect(handle.ref.value()).toEqual(['v1']);
      handle.ref.reload(); // reload() calls _notifyRequest internally → advances sequence
      expect(handle.ref.value()).toEqual(['v2']);
    });

    it('error-then-success pattern', () => {
      const err = new Error('timeout');
      const handle = mockResource<number>(TOKEN as never, {
        sequence: [{ error: err }, { value: 42 }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn(); // call 1 → error
      expect(handle.ref.status()).toBe('error');
      expect(handle.ref.error()).toBe(err);
      fn(); // call 2 → success (simulates param change / retry)
      expect(handle.ref.status()).toBe('resolved');
      expect(handle.ref.value()).toBe(42);
    });

    it('loading → resolved pattern', () => {
      const handle = mockResource<string>(TOKEN as never, {
        sequence: [{ loading: true }, { value: 'done' }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn(); // call 1 → loading
      expect(handle.ref.isLoading()).toBe(true);
      fn(); // call 2 → resolved
      expect(handle.ref.value()).toBe('done');
    });

    it('repeats last entry when sequence is exhausted', () => {
      const handle = mockResource<number>(TOKEN as never, {
        sequence: [{ value: 1 }, { value: 2 }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn();
      expect(handle.ref.value()).toBe(1);
      fn();
      expect(handle.ref.value()).toBe(2);
      fn(); // beyond sequence — last entry repeats
      expect(handle.ref.value()).toBe(2);
    });

    it('still tracks calls in sequence mode', () => {
      const handle = mockResource<string>(TOKEN as never, {
        sequence: [{ value: 'x' }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn({ param: 1 });
      expect(handle.calls).toHaveLength(1);
      expect(handle.calls[0]).toEqual([{ param: 1 }]);
    });

    it('delay in sequence entry: loading immediately then resolves after delay', () => {
      vi.useFakeTimers();
      const handle = mockResource<string>(TOKEN as never, {
        sequence: [{ value: 'slow', delay: 300 }],
      });
      const fn = handle.useFactory!() as FakeFn;
      fn();
      expect(handle.ref.isLoading()).toBe(true);
      vi.advanceTimersByTime(300);
      expect(handle.ref.status()).toBe('resolved');
      expect(handle.ref.value()).toBe('slow');
      vi.useRealTimers();
    });
  });
});

describe('mockObservable', () => {
  const setup = (...args: Parameters<typeof mockObservable<string[]>>[1][]) => {
    const handle = mockObservable<string[]>(TOKEN as never, ...args);
    const fn = handle.useFactory!() as (...a: unknown[]) => Observable<string[]>;
    return { handle, fn };
  };
  const collect = (obs: Observable<string[]>) => {
    const out = { values: [] as string[][], error: undefined as unknown, done: false };
    obs.subscribe({
      next: (v) => out.values.push(v),
      error: (e) => (out.error = e),
      complete: () => (out.done = true),
    });
    return out;
  };

  it('provides the token', () => {
    expect(mockObservable(TOKEN as never).provide).toBe(TOKEN);
  });

  it('emits a value once and completes', () => {
    const { fn } = setup({ value: ['a'] });
    expect(collect(fn())).toEqual({ values: [['a']], error: undefined, done: true });
  });

  it('errors on an error behavior', () => {
    const { fn } = setup({ error: 'boom' });
    const out = collect(fn());
    expect(out.error).toBe('boom');
    expect(out.values).toEqual([]);
  });

  it('never settles on { loading: true } or with no behavior', () => {
    for (const b of [{ loading: true as const }, undefined]) {
      const out = collect(setup(b).fn());
      expect(out).toEqual({ values: [], error: undefined, done: false });
    }
  });

  it('is cold: nothing happens until subscribed, and each subscription counts', () => {
    const { handle, fn } = setup({ value: ['a'] });
    const obs = fn();
    expect(handle.subscriptions).toBe(0);
    collect(obs);
    collect(obs);
    expect(handle.subscriptions).toBe(2);
  });

  it('delays the emission', () => {
    vi.useFakeTimers();
    try {
      const { fn } = setup({ value: ['late'], delay: 100 });
      const out = collect(fn());
      expect(out.values).toEqual([]);
      vi.advanceTimersByTime(100);
      expect(out.values).toEqual([['late']]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('unsubscribing cancels a pending delayed emission', () => {
    vi.useFakeTimers();
    try {
      const { fn } = setup({ value: ['late'], delay: 100 });
      const seen: string[][] = [];
      fn().subscribe((v) => seen.push(v)).unsubscribe();
      vi.advanceTimersByTime(200);
      expect(seen).toEqual([]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('sequence: each subscription consumes the next entry and the last repeats', () => {
    const { fn } = setup({ sequence: [{ error: 'first' }, { value: ['ok'] }] });
    expect(collect(fn()).error).toBe('first');
    expect(collect(fn()).values).toEqual([['ok']]);
    expect(collect(fn()).values).toEqual([['ok']]);
  });

  it('records calls and supports expectCalled / expectCalledWith', () => {
    const { handle, fn } = setup({ value: [] });
    expect(() => handle.expectCalled()).toThrow(/never called/);
    fn({ status: 'available' });
    handle.expectCalled();
    handle.expectCalledWith({ status: 'available' });
    expect(() => handle.expectCalledWith({ status: 'sold' })).toThrow(/called with/);
    expect(handle.calls).toEqual([[{ status: 'available' }]]);
  });
});
