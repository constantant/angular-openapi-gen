import { InjectionToken, FactoryProvider } from '@angular/core';
import { HttpEventType, HttpResponse, httpResource, type HttpEvent } from '@angular/common/http';
import { Observable, type Subscriber, type TeardownLogic } from 'rxjs';
import { createMockResourceRef } from './lib/mock-resource-ref';
import type { MockResourceRef, MockResourceRefInternal } from './lib/mock-resource-ref';
import type { ProviderInitialBehavior } from './lib/provide-mock-resource';
import type { MockProgress } from './lib/mock-events';

/** One step in a response sequence — same shape as the single initialBehavior. */
export type MockSequenceEntry<T> = ProviderInitialBehavior<T>;

/** A FactoryProvider that also exposes the underlying ref and call history for assertions. */
export interface MockResourceHandle<T> extends FactoryProvider {
  /** The underlying MockResourceRef — use to change state mid-test. */
  readonly ref: MockResourceRef<T>;
  /** Every set of args the injected factory function was called with. */
  readonly calls: readonly unknown[][];
  /** Throws if the token factory was never called. */
  expectCalled(): void;
  /** Throws if no call matches all provided args (deep equality). */
  expectCalledWith(...args: unknown[]): void;
}

function applyBehavior<T>(ref: MockResourceRef<T>, behavior: ProviderInitialBehavior<T>): void {
  if ('value' in behavior) {
    if (behavior.delay) {
      ref.resolveAfter(behavior.delay, behavior.value as T);
    } else {
      ref.resolve(behavior.value as T);
    }
  } else if ('error' in behavior) {
    if (behavior.delay) {
      ref.setLoading();
      setTimeout(() => ref.fail(behavior.error), behavior.delay);
    } else {
      ref.fail(behavior.error);
    }
  } else {
    ref.setLoading();
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((k) =>
    deepEqual(
      (a as Record<string, unknown>)[k],
      (b as Record<string, unknown>)[k],
    ),
  );
}

function assertCalled(calls: readonly unknown[][]): void {
  if (calls.length === 0) {
    throw new Error(
      `Expected mock token to have been called at least once, but it was never called.`,
    );
  }
}

function assertCalledWith(calls: readonly unknown[][], expected: unknown[]): void {
  const found = calls.some(
    (call) =>
      call.length === expected.length && expected.every((arg, i) => deepEqual(arg, call[i])),
  );
  if (!found) {
    throw new Error(
      `Expected mock to have been called with ${JSON.stringify(expected)}, ` +
        `but actual calls were: ${JSON.stringify(calls)}`,
    );
  }
}

/**
 * Creates a lightweight mock provider for an httpResource token — no MockResourceBus,
 * no DOM events. Drop the handle directly into TestBed `providers: []`.
 *
 * **Single behavior:**
 * ```ts
 * const petsMock = mockResource(FIND_PETS_BY_STATUS, { value: [] });
 * TestBed.configureTestingModule({ providers: [petsMock] });
 * petsMock.expectCalled();
 * petsMock.expectCalledWith({ status: 'active' });
 * petsMock.ref.resolve(newPets); // change mid-test
 * ```
 *
 * **Response sequence** (each call / reload consumes the next entry; last repeats):
 * ```ts
 * const petsMock = mockResource(FIND_PETS_BY_STATUS, {
 *   sequence: [{ loading: true }, { error: new Error('timeout') }, { value: pets }],
 * });
 * ```
 */
export function mockResource<T>(
  token: InjectionToken<(...args: unknown[]) => ReturnType<typeof httpResource<T>>>,
  behaviorOrOptions?: ProviderInitialBehavior<T> | { sequence: MockSequenceEntry<T>[] },
): MockResourceHandle<T> {
  const ref = createMockResourceRef<T>();
  const internal = ref as MockResourceRefInternal<T>;
  const calls: unknown[][] = [];

  let notifyOnCall = false;

  if (!behaviorOrOptions) {
    // no-op: ref stays idle
  } else if ('sequence' in behaviorOrOptions) {
    const sequence = behaviorOrOptions.sequence;
    let idx = 0;
    ref.onRequest(() => {
      const entry = idx < sequence.length ? sequence[idx++] : sequence[sequence.length - 1];
      applyBehavior(ref, entry);
    });
    notifyOnCall = true;
  } else {
    applyBehavior(ref, behaviorOrOptions);
  }

  const handle: MockResourceHandle<T> = {
    provide: token,
    useFactory: () =>
      (...args: unknown[]) => {
        calls.push(args);
        if (notifyOnCall) internal._notifyRequest(args);
        return ref as unknown as ReturnType<typeof httpResource<T>>;
      },
    get ref() {
      return ref;
    },
    get calls() {
      return calls as readonly unknown[][];
    },
    expectCalled() {
      assertCalled(calls);
    },
    expectCalledWith(...expected: unknown[]) {
      assertCalledWith(calls, expected);
    },
  };

  return handle;
}

/** A FactoryProvider for an Observable (HttpClient) token, with call history for assertions. */
export interface MockObservableHandle extends FactoryProvider {
  /** Every set of args the injected function was called with. */
  readonly calls: readonly unknown[][];
  /** Number of subscriptions made to observables returned by the function. */
  readonly subscriptions: number;
  /** Throws if the token function was never called. */
  expectCalled(): void;
  /** Throws if no call matches all provided args (deep equality). */
  expectCalledWith(...args: unknown[]): void;
}

/**
 * Shared core of the Observable mocks: records calls, counts subscriptions, and picks the
 * behavior for each subscription (a single behavior, or the next entry of a sequence — the last
 * one repeats). `run` turns a behavior into emissions.
 */
function createObservableMock<B>(
  token: InjectionToken<unknown>,
  behaviorOrOptions: B | { sequence: B[] } | undefined,
  run: (behavior: B | undefined, subscriber: Subscriber<unknown>) => TeardownLogic,
): MockObservableHandle {
  const calls: unknown[][] = [];
  let subscriptions = 0;

  const nextBehavior = (): B | undefined => {
    if (!behaviorOrOptions) return undefined;
    if (typeof behaviorOrOptions === 'object' && 'sequence' in behaviorOrOptions) {
      const { sequence } = behaviorOrOptions as { sequence: B[] };
      return sequence[Math.min(subscriptions - 1, sequence.length - 1)];
    }
    return behaviorOrOptions as B;
  };

  return {
    provide: token,
    useFactory: () =>
      (...args: unknown[]): Observable<unknown> => {
        calls.push(args);
        return new Observable<unknown>((subscriber) => {
          subscriptions++;
          return run(nextBehavior(), subscriber);
        });
      },
    get calls() {
      return calls as readonly unknown[][];
    },
    get subscriptions() {
      return subscriptions;
    },
    expectCalled() {
      assertCalled(calls);
    },
    expectCalledWith(...expected: unknown[]) {
      assertCalledWith(calls, expected);
    },
  };
}

/** Runs `settle` now, or after `delay` ms (cancelled on unsubscribe). */
function settleAfter(delay: number | undefined, settle: () => void): TeardownLogic {
  if (!delay) {
    settle();
    return undefined;
  }
  const timer = setTimeout(settle, delay);
  return () => clearTimeout(timer);
}

/**
 * Creates a lightweight mock provider for a token generated with `clientType: 'httpClient'`
 * (a function returning `Observable<T>`). No MockResourceBus, no DOM events.
 *
 * The observable is cold, like `HttpClient`: each **subscription** consumes the next
 * behavior. `{ value }` emits once and completes, `{ error }` errors, `{ loading: true }`
 * never emits; `delay` defers the emission by that many ms.
 *
 * ```ts
 * const petsMock = mockObservable(FIND_PETS_BY_STATUS, { value: [] });
 * TestBed.configureTestingModule({ providers: [petsMock] });
 * petsMock.expectCalledWith({ status: 'available' });
 *
 * // retry scenario: fail once, then succeed
 * const retry = mockObservable(FIND_PETS_BY_STATUS, {
 *   sequence: [{ error: new Error('timeout') }, { value: pets }],
 * });
 * ```
 */
export function mockObservable<T>(
  token: InjectionToken<(...args: unknown[]) => Observable<T>>,
  behaviorOrOptions?: ProviderInitialBehavior<T> | { sequence: MockSequenceEntry<T>[] },
): MockObservableHandle {
  return createObservableMock<ProviderInitialBehavior<T>>(token, behaviorOrOptions, (behavior, subscriber) => {
    if (!behavior || 'loading' in behavior) return undefined; // never settles
    return settleAfter(behavior.delay, () => {
      if ('error' in behavior) {
        subscriber.error(behavior.error);
      } else {
        subscriber.next(behavior.value as T);
        subscriber.complete();
      }
    });
  });
}

/**
 * A behavior for {@link mockHttpEvents}: the same shapes as `mockObservable`, plus an optional
 * list of progress events to emit before the response settles.
 */
export type MockHttpEventsBehavior<T> = ProviderInitialBehavior<T> & {
  /** `UploadProgress` / `DownloadProgress` events emitted, in order, right after `Sent`. */
  progress?: MockProgress[];
};

/**
 * Like {@link mockObservable}, for tokens generated with `--reportProgress` whose function
 * returns `Observable<HttpEvent<T>>` (file uploads / blob downloads over `httpClient`).
 *
 * Each subscription emits what a real `HttpClient` call with `reportProgress: true` emits: a
 * `Sent` event, then the behavior's `progress` events, then — unless it is `{ loading: true }` —
 * a `Response` event (status 200) carrying `value`, then completion; `{ error }` errors instead.
 * `delay` defers the final response / error.
 *
 * ```ts
 * // a component test that asserts the progress bar, holding the upload open at 25 %
 * const upload = mockHttpEvents(UPLOAD_FILE, {
 *   loading: true,
 *   progress: [{ type: 'upload', loaded: 1_000_000, total: 4_000_000 }],
 * });
 *
 * // a complete upload: 50 %, 100 %, then the response
 * const done = mockHttpEvents(UPLOAD_FILE, {
 *   progress: [
 *     { type: 'upload', loaded: 2_000_000, total: 4_000_000 },
 *     { type: 'upload', loaded: 4_000_000, total: 4_000_000 },
 *   ],
 *   value: { code: 200, message: 'stored' },
 * });
 * ```
 */
export function mockHttpEvents<T>(
  token: InjectionToken<(...args: unknown[]) => Observable<HttpEvent<T>>>,
  behaviorOrOptions?: MockHttpEventsBehavior<T> | { sequence: MockHttpEventsBehavior<T>[] },
): MockObservableHandle {
  return createObservableMock<MockHttpEventsBehavior<T>>(token, behaviorOrOptions, (behavior, subscriber) => {
    subscriber.next({ type: HttpEventType.Sent });
    for (const p of behavior?.progress ?? []) {
      subscriber.next({
        type: p.type === 'upload' ? HttpEventType.UploadProgress : HttpEventType.DownloadProgress,
        loaded: p.loaded,
        total: p.total,
      });
    }
    if (!behavior || 'loading' in behavior) return undefined; // stays open after Sent / progress
    return settleAfter(behavior.delay, () => {
      if ('error' in behavior) {
        subscriber.error(behavior.error);
      } else {
        subscriber.next(new HttpResponse<T>({ body: behavior.value as T, status: 200 }));
        subscriber.complete();
      }
    });
  });
}
