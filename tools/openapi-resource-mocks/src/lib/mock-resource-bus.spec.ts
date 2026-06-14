import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MockResourceBus } from './mock-resource-bus';
import { createMockResourceRef } from './mock-resource-ref';

describe('MockResourceBus', () => {
  let bus: MockResourceBus;

  beforeEach(() => {
    delete window.__openApiMocks__;
    bus = new MockResourceBus();
  });

  afterEach(() => {
    delete window.__openApiMocks__;
  });

  describe('window exposure', () => {
    it('creates window.__openApiMocks__ on first register', () => {
      const ref = createMockResourceRef({ value: 1 });
      bus.register('MY_TOKEN', ref);
      expect(window.__openApiMocks__).toBeDefined();
      expect(window.__openApiMocks__!['MY_TOKEN']).toBeDefined();
    });

    it('exposes resolve() that updates the ref', () => {
      const ref = createMockResourceRef<string[]>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].resolve(['a', 'b']);
      expect(ref.value()).toEqual(['a', 'b']);
    });

    it('exposes setLoading() that updates the ref', () => {
      const ref = createMockResourceRef({ value: 'x' });
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].setLoading();
      expect(ref.isLoading()).toBe(true);
    });

    it('exposes fail() that updates the ref', () => {
      const err = new Error('boom');
      const ref = createMockResourceRef();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].fail(err);
      expect(ref.error()).toBe(err);
    });

    it('exposes reset() that updates the ref', () => {
      const ref = createMockResourceRef({ value: 42 });
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].reset();
      expect(ref.value()).toBeUndefined();
    });

    it('getState() returns a snapshot of current state', () => {
      const ref = createMockResourceRef({ value: 'hello' });
      bus.register('MY_TOKEN', ref);
      const state = window.__openApiMocks__!['MY_TOKEN'].getState();
      expect(state.value).toBe('hello');
      expect(state.error).toBeUndefined();
    });

    it('getHistory() accumulates state-change events in order', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].resolve('x');
      window.__openApiMocks__!['MY_TOKEN'].setLoading();
      window.__openApiMocks__!['MY_TOKEN'].fail(new Error());
      const history = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      expect(history.map((e) => e.type)).toEqual(['resolve', 'loading', 'error']);
    });

    it('getHistory() returns a copy (immutable snapshot)', () => {
      const ref = createMockResourceRef();
      bus.register('MY_TOKEN', ref);
      const h1 = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      window.__openApiMocks__!['MY_TOKEN'].resolve('x');
      expect(h1).toHaveLength(0); // original copy is unaffected
    });

    it('onEvent() fires for each state change', () => {
      const ref = createMockResourceRef<number>();
      bus.register('MY_TOKEN', ref);
      const events: string[] = [];
      window.__openApiMocks__!['MY_TOKEN'].onEvent((e) => events.push(e.type));
      window.__openApiMocks__!['MY_TOKEN'].resolve(1);
      window.__openApiMocks__!['MY_TOKEN'].setLoading();
      expect(events).toEqual(['resolve', 'loading']);
    });

    it('onEvent() unsubscribes correctly', () => {
      const ref = createMockResourceRef();
      bus.register('MY_TOKEN', ref);
      const events: string[] = [];
      const unsub = window.__openApiMocks__!['MY_TOKEN'].onEvent((e) => events.push(e.type));
      unsub();
      window.__openApiMocks__!['MY_TOKEN'].resolve('x');
      expect(events).toHaveLength(0);
    });
  });

  describe('DOM event bridge', () => {
    it('emits openapi-mock-event on resolve', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      const domEvents: CustomEvent[] = [];
      document.addEventListener('openapi-mock-event', (e) =>
        domEvents.push(e as CustomEvent),
      );
      window.__openApiMocks__!['MY_TOKEN'].resolve('hello');
      expect(domEvents).toHaveLength(1);
      expect(domEvents[0].detail.key).toBe('MY_TOKEN');
      expect(domEvents[0].detail.event.type).toBe('resolve');
    });

    it('applies resolve from openapi-mock-control event', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: { key: 'MY_TOKEN', action: 'resolve', value: 'from-extension' },
        }),
      );
      expect(ref.value()).toBe('from-extension');
    });

    it('applies setLoading from openapi-mock-control event', () => {
      const ref = createMockResourceRef({ value: 'x' });
      bus.register('MY_TOKEN', ref);
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: { key: 'MY_TOKEN', action: 'setLoading' },
        }),
      );
      expect(ref.isLoading()).toBe(true);
    });

    it('ignores openapi-mock-control for unknown keys', () => {
      expect(() => {
        document.dispatchEvent(
          new CustomEvent('openapi-mock-control', {
            detail: { key: 'UNKNOWN', action: 'resolve', value: 'x' },
          }),
        );
      }).not.toThrow();
    });
  });

  describe('bus.get()', () => {
    it('returns the registered ref', () => {
      const ref = createMockResourceRef({ value: 42 });
      bus.register('MY_TOKEN', ref);
      expect(bus.get('MY_TOKEN')).toBe(ref);
    });

    it('returns undefined for unknown key', () => {
      expect(bus.get('UNKNOWN')).toBeUndefined();
    });
  });

  describe('progress', () => {
    it('setProgress() updates ref and appears in history', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].setProgress('upload', 512, 1024);
      expect(ref.progress()).toEqual({ type: 'upload', loaded: 512, total: 1024 });
      const history = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      const ev = history.find((e) => e.type === 'progress') as any;
      expect(ev).toBeDefined();
      expect(ev.progressType).toBe('upload');
      expect(ev.loaded).toBe(512);
      expect(ev.total).toBe(1024);
    });

    it('setProgress() fires openapi-mock-event DOM event', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      const events: CustomEvent[] = [];
      document.addEventListener('openapi-mock-event', (e) => events.push(e as CustomEvent));
      window.__openApiMocks__!['MY_TOKEN'].setProgress('download', 200);
      expect(events).toHaveLength(1);
      expect(events[0].detail.event.type).toBe('progress');
    });

    it('getState() includes progress', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].setProgress('upload', 300, 1000);
      const state = window.__openApiMocks__!['MY_TOKEN'].getState();
      expect((state.progress as any)?.loaded).toBe(300);
    });

    it('applies setProgress from openapi-mock-control event', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: { key: 'MY_TOKEN', action: 'setProgress', progressType: 'download', loaded: 750, total: 1000 },
        }),
      );
      expect(ref.progress()).toEqual({ type: 'download', loaded: 750, total: 1000 });
    });
  });

  describe('request capture', () => {
    it('emits request event to window history when factory is invoked', () => {
      const ref = createMockResourceRef();
      bus.register('MY_TOKEN', ref);
      (ref as any)._notifyRequest([{ status: 'available' }]);
      const history = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      expect(history[0].type).toBe('request');
      expect((history[0] as any).args).toEqual([{ status: 'available' }]);
    });
  });

  describe('resolveAfter events', () => {
    it('emits loading then resolve events and appears in history', async () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].resolveAfter(200, 'done');
      const historyAfterCall = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      expect(historyAfterCall.map((e) => e.type)).toContain('loading');
      expect(ref.isLoading()).toBe(true);
      vi.advanceTimersByTime(200);
      const historyAfterResolve = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      expect(historyAfterResolve.map((e) => e.type)).toContain('resolve');
      expect(ref.status()).toBe('resolved');
      expect(ref.value()).toBe('done');
      vi.useRealTimers();
    });

    it('fires openapi-mock-event for both loading and resolve', () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      const domTypes: string[] = [];
      document.addEventListener('openapi-mock-event', (e) =>
        domTypes.push((e as CustomEvent).detail.event.type),
      );
      window.__openApiMocks__!['MY_TOKEN'].resolveAfter(100, 'x');
      vi.advanceTimersByTime(100);
      expect(domTypes).toContain('loading');
      expect(domTypes).toContain('resolve');
      vi.useRealTimers();
    });
  });

  describe('simulateProgress events', () => {
    it('emits loading, progress ticks, and resolve in history', () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].simulateProgress('upload', 1000, 500, 'done', 5);
      vi.advanceTimersByTime(600); // 5 steps + final resolve
      const history = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      const types = history.map((e) => e.type);
      expect(types).toContain('loading');
      expect(types.filter((t) => t === 'progress').length).toBe(5);
      expect(types).toContain('resolve');
      vi.useRealTimers();
    });

    it('fires openapi-mock-event for each progress tick', () => {
      vi.useFakeTimers();
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      const domEvents: CustomEvent[] = [];
      document.addEventListener('openapi-mock-event', (e) => domEvents.push(e as CustomEvent));
      window.__openApiMocks__!['MY_TOKEN'].simulateProgress('download', 100, 200, 'result', 2);
      vi.advanceTimersByTime(300);
      const domTypes = domEvents.map((e) => e.detail.event.type);
      expect(domTypes.filter((t) => t === 'progress').length).toBe(2);
      expect(domTypes).toContain('resolve');
      vi.useRealTimers();
    });
  });

  describe('reload', () => {
    it('window entry reload() sets status to reloading and keeps value', () => {
      const ref = createMockResourceRef({ value: 99 });
      bus.register('MY_TOKEN', ref);
      const result = window.__openApiMocks__!['MY_TOKEN'].reload();
      expect(result).toBe(true);
      expect(ref.status()).toBe('reloading');
      expect(ref.value()).toBe(99);
    });

    it('reload() emits request event in history via _notifyRequest', () => {
      const ref = createMockResourceRef({ value: 'x' });
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].reload();
      const history = window.__openApiMocks__!['MY_TOKEN'].getHistory();
      expect(history.some((e) => e.type === 'request')).toBe(true);
    });

    it('openapi-mock-control reload action triggers reload', () => {
      const ref = createMockResourceRef({ value: 'abc' });
      bus.register('MY_TOKEN', ref);
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: { key: 'MY_TOKEN', action: 'reload' },
        }),
      );
      expect(ref.status()).toBe('reloading');
    });

    it('getState() includes requestCount', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      (ref as any)._notifyRequest([]);
      (ref as any)._notifyRequest([]);
      const state = window.__openApiMocks__!['MY_TOKEN'].getState();
      expect(state.requestCount).toBe(2);
    });
  });

  describe('clearHistory', () => {
    it('clears all history entries', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].resolve('a');
      window.__openApiMocks__!['MY_TOKEN'].setLoading();
      expect(window.__openApiMocks__!['MY_TOKEN'].getHistory()).toHaveLength(2);
      window.__openApiMocks__!['MY_TOKEN'].clearHistory();
      expect(window.__openApiMocks__!['MY_TOKEN'].getHistory()).toHaveLength(0);
    });

    it('openapi-mock-control clearHistory action clears the log', () => {
      const ref = createMockResourceRef<string>();
      bus.register('MY_TOKEN', ref);
      window.__openApiMocks__!['MY_TOKEN'].resolve('x');
      document.dispatchEvent(
        new CustomEvent('openapi-mock-control', {
          detail: { key: 'MY_TOKEN', action: 'clearHistory' },
        }),
      );
      expect(window.__openApiMocks__!['MY_TOKEN'].getHistory()).toHaveLength(0);
    });
  });
});
