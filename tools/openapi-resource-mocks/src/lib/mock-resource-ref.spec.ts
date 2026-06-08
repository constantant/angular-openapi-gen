import { describe, it, expect, vi } from 'vitest';
import { createMockResourceRef } from './mock-resource-ref';

describe('createMockResourceRef', () => {
  describe('initial states', () => {
    it('defaults to idle with no argument', () => {
      const ref = createMockResourceRef();
      expect(ref.status()).toBe('idle');
      expect(ref.value()).toBeUndefined();
      expect(ref.error()).toBeUndefined();
      expect(ref.isLoading()).toBe(false);
      expect(ref.hasValue()).toBe(false);
    });

    it('initializes to resolved with { value }', () => {
      const ref = createMockResourceRef({ value: [1, 2, 3] });
      expect(ref.status()).toBe('resolved');
      expect(ref.value()).toEqual([1, 2, 3]);
      expect(ref.isLoading()).toBe(false);
      expect(ref.hasValue()).toBe(true);
    });

    it('initializes to loading with { loading: true }', () => {
      const ref = createMockResourceRef({ loading: true });
      expect(ref.status()).toBe('loading');
      expect(ref.value()).toBeUndefined();
      expect(ref.isLoading()).toBe(true);
      expect(ref.hasValue()).toBe(false);
    });

    it('initializes to error with { error }', () => {
      const err = new Error('oops');
      const ref = createMockResourceRef({ error: err });
      expect(ref.status()).toBe('error');
      expect(ref.error()).toBe(err);
      expect(ref.isLoading()).toBe(false);
    });
  });

  describe('state transitions', () => {
    it('resolve() sets value, clears error, status → resolved', () => {
      const ref = createMockResourceRef<string[]>({ loading: true });
      ref.resolve(['a', 'b']);
      expect(ref.status()).toBe('resolved');
      expect(ref.value()).toEqual(['a', 'b']);
      expect(ref.error()).toBeUndefined();
      expect(ref.hasValue()).toBe(true);
    });

    it('setLoading() clears error, status → loading', () => {
      const ref = createMockResourceRef({ value: 42 });
      ref.setLoading();
      expect(ref.status()).toBe('loading');
      expect(ref.isLoading()).toBe(true);
      expect(ref.error()).toBeUndefined();
    });

    it('fail() sets error, status → error', () => {
      const err = new Error('network error');
      const ref = createMockResourceRef({ value: 42 });
      ref.fail(err);
      expect(ref.status()).toBe('error');
      expect(ref.error()).toBe(err);
    });

    it('reset() clears everything, status → idle', () => {
      const ref = createMockResourceRef({ value: 42 });
      ref.reset();
      expect(ref.status()).toBe('idle');
      expect(ref.value()).toBeUndefined();
      expect(ref.error()).toBeUndefined();
      expect(ref.hasValue()).toBe(false);
    });

    it('set() updates value, status → local', () => {
      const ref = createMockResourceRef<number>();
      ref.set(99);
      expect(ref.status()).toBe('local');
      expect(ref.value()).toBe(99);
    });

    it('update() applies updater, status → local', () => {
      const ref = createMockResourceRef({ value: 1 });
      ref.update((v) => (v ?? 0) + 10);
      expect(ref.value()).toBe(11);
      expect(ref.status()).toBe('local');
    });

    it('resolveAfter() sets loading immediately then resolves after delay', async () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      ref.resolveAfter(500, 'hello');
      expect(ref.isLoading()).toBe(true);
      vi.advanceTimersByTime(500);
      expect(ref.status()).toBe('resolved');
      expect(ref.value()).toBe('hello');
      vi.useRealTimers();
    });
  });

  describe('onRequest', () => {
    it('fires callback when _notifyRequest is called', () => {
      const ref = createMockResourceRef<string>();
      const calls: unknown[][] = [];
      ref.onRequest((args) => calls.push(args));
      (ref as any)._notifyRequest(['param1', 'param2']);
      expect(calls).toEqual([['param1', 'param2']]);
    });

    it('unsubscribes correctly', () => {
      const ref = createMockResourceRef();
      const calls: unknown[][] = [];
      const unsub = ref.onRequest((args) => calls.push(args));
      unsub();
      (ref as any)._notifyRequest([]);
      expect(calls).toHaveLength(0);
    });

    it('supports multiple concurrent subscribers', () => {
      const ref = createMockResourceRef();
      const calls1: unknown[][] = [];
      const calls2: unknown[][] = [];
      ref.onRequest((args) => calls1.push(args));
      ref.onRequest((args) => calls2.push(args));
      (ref as any)._notifyRequest(['x']);
      expect(calls1).toHaveLength(1);
      expect(calls2).toHaveLength(1);
    });
  });

  describe('progress', () => {
    it('starts undefined', () => {
      const ref = createMockResourceRef();
      expect(ref.progress()).toBeUndefined();
    });

    it('setProgress() sets progress and status → loading', () => {
      const ref = createMockResourceRef<string>();
      ref.setProgress('upload', 512, 1024);
      expect(ref.progress()).toEqual({ type: 'upload', loaded: 512, total: 1024 });
      expect(ref.isLoading()).toBe(true);
    });

    it('setProgress() works without total (streaming download)', () => {
      const ref = createMockResourceRef<string>();
      ref.setProgress('download', 4096);
      expect(ref.progress()).toEqual({ type: 'download', loaded: 4096, total: undefined });
    });

    it('resolve() clears progress', () => {
      const ref = createMockResourceRef<string>({ loading: true });
      ref.setProgress('upload', 800, 1024);
      ref.resolve('done');
      expect(ref.progress()).toBeUndefined();
      expect(ref.status()).toBe('resolved');
    });

    it('fail() keeps progress (shows where transfer stopped)', () => {
      const ref = createMockResourceRef<string>({ loading: true });
      ref.setProgress('upload', 300, 1024);
      ref.fail(new Error('timeout'));
      expect(ref.progress()).toEqual({ type: 'upload', loaded: 300, total: 1024 });
      expect(ref.status()).toBe('error');
    });

    it('reset() clears progress', () => {
      const ref = createMockResourceRef<string>({ loading: true });
      ref.setProgress('download', 200, 500);
      ref.reset();
      expect(ref.progress()).toBeUndefined();
    });

    it('simulateProgress() animates through steps then resolves', async () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      const progressValues: number[] = [];
      // observe progress changes via polling after each timer advance
      ref.simulateProgress('upload', 1000, 500, 'done', 5);

      expect(ref.isLoading()).toBe(true);
      expect(ref.progress()).toBeUndefined(); // no progress yet — first step fires at 100ms

      vi.advanceTimersByTime(100);
      progressValues.push(ref.progress()?.loaded ?? -1);

      vi.advanceTimersByTime(400); // advance through remaining 4 steps
      expect(ref.progress()?.loaded).toBe(1000);

      vi.advanceTimersByTime(100); // resolve fires after durationMs + stepDelay
      expect(ref.status()).toBe('resolved');
      expect(ref.value()).toBe('done');
      expect(ref.progress()).toBeUndefined();

      expect(progressValues[0]).toBe(200); // first step: 1000/5 * 1

      vi.useRealTimers();
    });
  });

  describe('ResourceRef interface compliance', () => {
    it('reload() returns false (no-op)', () => {
      const ref = createMockResourceRef();
      expect(ref.reload()).toBe(false);
    });

    it('destroy() is a no-op', () => {
      const ref = createMockResourceRef();
      expect(() => ref.destroy()).not.toThrow();
    });

    it('asReadonly() returns self', () => {
      const ref = createMockResourceRef();
      expect(ref.asReadonly()).toBe(ref);
    });
  });
});
