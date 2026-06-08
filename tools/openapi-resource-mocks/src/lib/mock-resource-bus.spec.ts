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
});
