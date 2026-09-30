import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InjectionToken, Injector } from '@angular/core';
import type { Observable } from 'rxjs';
import { MockResourceBus } from './mock-resource-bus';
import { provideMockObservable } from './provide-mock-resource';

type Fn = (...args: unknown[]) => Observable<string[]>;

describe('provideMockObservable', () => {
  const TOKEN = new InjectionToken<Fn>('LIST');
  let bus: MockResourceBus;

  const setup = (...providerArgs: [Parameters<typeof provideMockObservable<string[]>>[2]?]) => {
    bus = new MockResourceBus();
    const injector = Injector.create({
      providers: [
        { provide: MockResourceBus, useValue: bus },
        provideMockObservable<string[]>(TOKEN, 'LIST', ...providerArgs),
      ],
    });
    return injector.get(TOKEN);
  };

  beforeEach(() => { delete window.__openApiMocks__; });
  afterEach(() => { delete window.__openApiMocks__; });

  it('registers the key on the bus when called, before subscribing', () => {
    const fn = setup();
    fn({ status: 'a' });
    expect(window.__openApiMocks__!['LIST'].getState().requestCount).toBe(0);
  });

  it('is cold: each subscription counts as a request', () => {
    const fn = setup({ value: ['x'] });
    const obs = fn();
    obs.subscribe();
    obs.subscribe();
    expect(window.__openApiMocks__!['LIST'].getState().requestCount).toBe(2);
  });

  it('emits the initialBehavior value then completes', () => {
    const fn = setup({ value: ['x'] });
    const seen: string[][] = [];
    let done = false;
    fn().subscribe({ next: (v) => seen.push(v), complete: () => (done = true) });
    expect(seen).toEqual([['x']]);
    expect(done).toBe(true);
  });

  it('errors on an error initialBehavior', () => {
    const fn = setup({ error: 'boom' });
    let err: unknown;
    fn().subscribe({ error: (e) => (err = e) });
    expect(err).toBe('boom');
  });

  it('stays pending until resolved from the bus (no initialBehavior)', () => {
    const fn = setup();
    const seen: string[][] = [];
    fn().subscribe((v) => seen.push(v));
    expect(seen).toEqual([]);
    window.__openApiMocks__!['LIST'].resolve(['late']);
    expect(seen).toEqual([['late']]);
  });

  it('catch mode holds the response until resolved manually', () => {
    const fn = setup({ value: ['auto'] });
    bus.setCatchMode('LIST', true);
    const seen: string[][] = [];
    fn().subscribe((v) => seen.push(v));
    expect(seen).toEqual([]);
    expect(window.__openApiMocks__!['LIST'].getHistory().map((e) => e.type)).toEqual(['request', 'caught']);
    window.__openApiMocks__!['LIST'].resolve(['manual']);
    expect(seen).toEqual([['manual']]);
  });

  it('records request args in history', () => {
    const fn = setup({ value: [] });
    fn({ status: 'a' }).subscribe();
    const ev = window.__openApiMocks__!['LIST'].getHistory()[0];
    expect(ev).toMatchObject({ type: 'request', args: [{ status: 'a' }] });
  });

  it('unsubscribing stops delivery', () => {
    const fn = setup();
    const seen: string[][] = [];
    fn().subscribe((v) => seen.push(v)).unsubscribe();
    window.__openApiMocks__!['LIST'].resolve(['x']);
    expect(seen).toEqual([]);
  });
  describe('panel-set responses replay on the next request', () => {
    const collect = (obs: Observable<string[]>) => {
      const out = { values: [] as string[][], error: undefined as unknown, done: false };
      obs.subscribe({ next: (v) => out.values.push(v), error: (e) => (out.error = e), complete: () => (out.done = true) });
      return out;
    };

    it('a resolve after completion is replayed by the next call, over initialBehavior', () => {
      const fn = setup({ value: ['initial'] });
      expect(collect(fn()).values).toEqual([['initial']]);
      window.__openApiMocks__!['LIST'].resolve(['from-panel']); // nothing pending
      expect(collect(fn()).values).toEqual([['from-panel']]);
      expect(collect(fn()).values).toEqual([['from-panel']]); // sticks
    });

    it('a fail after completion is replayed as an error', () => {
      const fn = setup({ value: ['initial'] });
      collect(fn());
      window.__openApiMocks__!['LIST'].fail('503');
      expect(collect(fn()).error).toBe('503');
    });

    it('the latest panel edit wins', () => {
      const fn = setup({ value: ['initial'] });
      collect(fn());
      window.__openApiMocks__!['LIST'].fail('503');
      collect(fn());
      window.__openApiMocks__!['LIST'].resolve(['fixed']);
      expect(collect(fn()).values).toEqual([['fixed']]);
    });

    it('replays on re-subscription of an existing observable too', () => {
      const fn = setup({ value: ['initial'] });
      const obs = fn();
      collect(obs);
      window.__openApiMocks__!['LIST'].resolve(['from-panel']);
      expect(collect(obs).values).toEqual([['from-panel']]);
    });

    it('a resolve that settles a pending request is delivered, not stored', () => {
      const fn = setup(); // no initialBehavior: request stays pending
      const first = collect(fn());
      window.__openApiMocks__!['LIST'].resolve(['x']);
      expect(first.values).toEqual([['x']]);
      // Nothing was stored: a later call with no initialBehavior is pending again.
      expect(collect(fn())).toEqual({ values: [], error: undefined, done: false });
    });

    it('a delayed initialBehavior completes normally and a later panel edit still replays', () => {
      vi.useFakeTimers();
      try {
        const fn = setup({ value: ['initial'], delay: 100 });
        const out = collect(fn());
        vi.advanceTimersByTime(100);
        expect(out.values).toEqual([['initial']]);
        // A later panel edit (nothing pending) is what the next call returns.
        window.__openApiMocks__!['LIST'].resolve(['edited']);
        const next = collect(fn());
        expect(next.values).toEqual([['edited']]);
      } finally {
        vi.useRealTimers();
      }
    });

    it('a panel resolve during a delayed initial behavior wins and cancels the timer', () => {
      vi.useFakeTimers();
      try {
        const fn = setup({ value: ['slow'], delay: 100 });
        const out = collect(fn());
        window.__openApiMocks__!['LIST'].resolve(['fast']);
        vi.advanceTimersByTime(200);
        expect(out.values).toEqual([['fast']]); // no second emission from the timer
      } finally {
        vi.useRealTimers();
      }
    });

    it('unsubscribing before a delayed initial behavior fires stores nothing', () => {
      vi.useFakeTimers();
      try {
        const fn = setup({ value: ['initial'], delay: 100 });
        fn().subscribe().unsubscribe();
        vi.advanceTimersByTime(200);
        vi.advanceTimersByTime(0);
        const out = collect(fn());
        vi.advanceTimersByTime(100);
        expect(out.values).toEqual([['initial']]);
      } finally {
        vi.useRealTimers();
      }
    });

    it('catch mode still holds a request even when an override exists', () => {
      const fn = setup({ value: ['initial'] });
      collect(fn());
      window.__openApiMocks__!['LIST'].resolve(['from-panel']);
      bus.setCatchMode('LIST', true);
      const out = collect(fn());
      expect(out.values).toEqual([]); // held
      window.__openApiMocks__!['LIST'].resolve(['released']);
      expect(out.values).toEqual([['released']]);
    });
  });
});
