import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InjectionToken, Injector } from '@angular/core';
import { HttpEventType, HttpResponse, type HttpEvent } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { MockResourceBus } from './mock-resource-bus';
import { provideMockHttpEvents, provideMockObservable } from './provide-mock-resource';

interface Uploaded { id: number }
type Fn = (...args: unknown[]) => Observable<HttpEvent<Uploaded>>;

describe('provideMockHttpEvents', () => {
  const TOKEN = new InjectionToken<Fn>('UPLOAD');
  let bus: MockResourceBus;

  const setup = (initial?: Parameters<typeof provideMockHttpEvents<Uploaded>>[2]) => {
    bus = new MockResourceBus();
    const injector = Injector.create({
      providers: [
        { provide: MockResourceBus, useValue: bus },
        provideMockHttpEvents<Uploaded>(TOKEN, 'UPLOAD', initial),
      ],
    });
    return injector.get(TOKEN);
  };
  const entry = () => window.__openApiMocks__!['UPLOAD'];

  /** Subscribes and records every event plus how the stream ended. */
  const collect = (obs: Observable<HttpEvent<Uploaded>>) => {
    const out = { events: [] as HttpEvent<Uploaded>[], error: undefined as unknown, done: false };
    const sub = obs.subscribe({
      next: (e) => out.events.push(e),
      error: (e) => (out.error = e),
      complete: () => (out.done = true),
    });
    return { out, sub };
  };
  const types = (events: HttpEvent<Uploaded>[]) => events.map((e) => e.type);

  beforeEach(() => { delete window.__openApiMocks__; });
  afterEach(() => { delete window.__openApiMocks__; });

  it('emits a Sent event first, like HttpClient with reportProgress', () => {
    const fn = setup();
    const { out } = collect(fn('7', new Blob(['x'])));
    expect(types(out.events)).toEqual([HttpEventType.Sent]);
    expect(out.done).toBe(false);
  });

  it('emits UploadProgress events for setProgress("upload")', () => {
    const { out } = collect(setup()());
    entry().setProgress('upload', 1_000, 4_000);
    entry().setProgress('upload', 4_000, 4_000);
    expect(out.events.slice(1)).toEqual([
      { type: HttpEventType.UploadProgress, loaded: 1_000, total: 4_000 },
      { type: HttpEventType.UploadProgress, loaded: 4_000, total: 4_000 },
    ]);
  });

  it('emits DownloadProgress events for setProgress("download") (total may be unknown)', () => {
    const { out } = collect(setup()());
    entry().setProgress('download', 512);
    expect(out.events[1]).toEqual({ type: HttpEventType.DownloadProgress, loaded: 512, total: undefined });
  });

  it('resolve emits a Response event carrying the value, then completes', () => {
    const { out } = collect(setup()());
    entry().resolve({ id: 7 });
    const last = out.events.at(-1) as HttpResponse<Uploaded>;
    expect(last).toBeInstanceOf(HttpResponse);
    expect(last.type).toBe(HttpEventType.Response);
    expect(last.status).toBe(200);
    expect(last.body).toEqual({ id: 7 });
    expect(out.done).toBe(true);
  });

  it('simulateProgress emits increasing progress events, then the Response', () => {
    vi.useFakeTimers();
    try {
      const { out } = collect(setup()());
      entry().simulateProgress('upload', 1_000, 100, { id: 1 }, 4);
      vi.advanceTimersByTime(500);
      const loaded = out.events
        .filter((e) => e.type === HttpEventType.UploadProgress)
        .map((e) => (e as { loaded: number }).loaded);
      expect(loaded).toEqual([250, 500, 750, 1_000]);
      expect(out.events.at(-1)?.type).toBe(HttpEventType.Response);
      expect(out.done).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('fail errors the stream after progress, keeping the progress events seen so far', () => {
    const { out } = collect(setup()());
    entry().setProgress('upload', 1_000, 4_000);
    entry().fail('connection reset');
    expect(out.error).toBe('connection reset');
    expect(types(out.events)).toEqual([HttpEventType.Sent, HttpEventType.UploadProgress]);
  });

  it('initialBehavior value emits Sent then Response straight away', () => {
    const { out } = collect(setup({ value: { id: 9 } })());
    expect(types(out.events)).toEqual([HttpEventType.Sent, HttpEventType.Response]);
    expect(out.done).toBe(true);
  });

  it('catch mode holds the request until the panel drives it', () => {
    const fn = setup({ value: { id: 9 } });
    bus.setCatchMode('UPLOAD', true);
    const { out } = collect(fn());
    expect(types(out.events)).toEqual([HttpEventType.Sent]);
    entry().setProgress('upload', 10, 100);
    entry().resolve({ id: 1 });
    expect(types(out.events)).toEqual([HttpEventType.Sent, HttpEventType.UploadProgress, HttpEventType.Response]);
  });

  it('a panel resolve with nothing pending is replayed by the next request as a Response', () => {
    const fn = setup({ value: { id: 1 } });
    collect(fn());
    entry().resolve({ id: 42 });
    const { out } = collect(fn());
    expect((out.events.at(-1) as HttpResponse<Uploaded>).body).toEqual({ id: 42 });
  });

  it('stops delivering progress after unsubscribe (e.g. a cancelled upload)', () => {
    const { out, sub } = collect(setup()());
    sub.unsubscribe();
    entry().setProgress('upload', 5, 10);
    expect(types(out.events)).toEqual([HttpEventType.Sent]);
  });

  it('provideMockObservable stays value-only: no Sent / progress events', () => {
    const PLAIN = new InjectionToken<(...a: unknown[]) => Observable<Uploaded>>('PLAIN');
    bus = new MockResourceBus();
    const injector = Injector.create({
      providers: [
        { provide: MockResourceBus, useValue: bus },
        provideMockObservable<Uploaded>(PLAIN, 'PLAIN'),
      ],
    });
    const seen: unknown[] = [];
    injector.get(PLAIN)().subscribe((v) => seen.push(v));
    window.__openApiMocks__!['PLAIN'].setProgress('upload', 1, 2);
    window.__openApiMocks__!['PLAIN'].resolve({ id: 3 });
    expect(seen).toEqual([{ id: 3 }]);
  });
});
