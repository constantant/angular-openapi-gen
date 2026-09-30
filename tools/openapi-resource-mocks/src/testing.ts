import { InjectionToken, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createMockResourceRef } from './lib/mock-resource-ref';
import type { MockResourceRef, MockResourceRefInternal } from './lib/mock-resource-ref';
import type { ProviderInitialBehavior } from './lib/provide-mock-resource';

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
  const calls: unknown[][] = [];
  let subscriptions = 0;

  const nextBehavior = (): ProviderInitialBehavior<T> | undefined => {
    if (!behaviorOrOptions) return undefined;
    if ('sequence' in behaviorOrOptions) {
      const { sequence } = behaviorOrOptions;
      return sequence[Math.min(subscriptions - 1, sequence.length - 1)];
    }
    return behaviorOrOptions;
  };

  return {
    provide: token,
    useFactory: () =>
      (...args: unknown[]): Observable<T> => {
        calls.push(args);
        return new Observable<T>((subscriber) => {
          subscriptions++;
          const behavior = nextBehavior();
          if (!behavior || 'loading' in behavior) return undefined; // never settles
          const settle = (): void => {
            if ('error' in behavior) {
              subscriber.error(behavior.error);
            } else {
              subscriber.next(behavior.value as T);
              subscriber.complete();
            }
          };
          if (!behavior.delay) {
            settle();
            return undefined;
          }
          const timer = setTimeout(settle, behavior.delay);
          return () => clearTimeout(timer);
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
