import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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
});
