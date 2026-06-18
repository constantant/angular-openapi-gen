import { InjectionToken, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
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
      if (calls.length === 0) {
        throw new Error(
          `Expected mock token to have been called at least once, but it was never called.`,
        );
      }
    },
    expectCalledWith(...expected: unknown[]) {
      const found = calls.some(
        (call) =>
          call.length === expected.length &&
          expected.every((arg, i) => deepEqual(arg, call[i])),
      );
      if (!found) {
        throw new Error(
          `Expected mock to have been called with ${JSON.stringify(expected)}, ` +
            `but actual calls were: ${JSON.stringify(calls)}`,
        );
      }
    },
  };

  return handle;
}
