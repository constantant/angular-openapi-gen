import { InjectionToken, inject, effect, untracked, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockResourceBus } from './mock-resource-bus';
import { createMockResourceRef, type MockResourceRef, type MockResourceRefInternal } from './mock-resource-ref';
import type { MockResourceMeta } from './mock-resource-meta';

export type DeepPartial<T> = T extends Array<infer E>
  ? DeepPartial<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type ProviderInitialBehavior<T> =
  | { value: DeepPartial<T>; delay?: number }
  | { loading: true }
  | { error: unknown; delay?: number };

export interface MockProviderOptions {
  /** Called inside the injection context to produce a suffix appended to the bus key as `key:suffix`. */
  keyDiscriminator?: () => string;
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

export function provideMockResource<T>(
  token: InjectionToken<(...args: unknown[]) => ReturnType<typeof httpResource<T>>>,
  key: string,
  initialBehavior?: ProviderInitialBehavior<T>,
  meta?: MockResourceMeta,
  options?: MockProviderOptions,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const discriminator = options?.keyDiscriminator;
      return (...args: unknown[]): ReturnType<typeof httpResource<T>> => {
        const effectiveKey = discriminator ? `${key}:${discriminator()}` : key;
        const ref = createMockResourceRef<T>();
        bus.register(effectiveKey, ref, meta);
        const internal = ref as MockResourceRefInternal<T>;

        if (initialBehavior) {
          // Re-apply on every request (initial, param change, reload) unless catch mode
          // is intercepting. The bus's onRequest listener (registered in bus.register)
          // runs first, so isCatchMode reflects whether this request was just caught.
          ref.onRequest(() => {
            if (!bus.isCatchMode(effectiveKey)) applyBehavior(ref, initialBehavior);
          });
        }

        // untracked() prevents thunk signal-reads from leaking into the outer reactive
        // context — component field initializers run during Angular change detection.
        untracked(() => { internal._notifyRequest(args); });

        // When any arg is a reactive thunk, track signal changes so each new set of
        // params fires a new request event (mirroring how httpResource re-fires on
        // reactive lambda changes). effect() is valid here because this function is
        // always called from a component constructor / field-initializer context.
        if (args.some((a) => typeof a === 'function')) {
          let first = true;
          effect(() => {
            // Resolve thunks inside the effect body so their signals are tracked.
            const resolved = args.map((a) => (typeof a === 'function' ? (a as () => unknown)() : a));
            untracked(() => {
              if (first) { first = false; return; } // first run already handled by _notifyRequest above
              internal._notifyRequest(resolved);
            });
          });
        }

        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}

/**
 * Mock provider for tokens generated with `clientType: 'httpClient'` — the token's function
 * returns a cold `Observable<T>` instead of an httpResource.
 *
 * Each call of the injected function registers a ref on the bus under `key` (so the DevTools
 * panel sees it immediately); each **subscription** counts as a request. The observable emits
 * once and completes when the ref resolves, or errors when it fails — so the same panel
 * controls (resolve / fail / catch mode / delay) drive both kinds of mock.
 */
export function provideMockObservable<T>(
  token: InjectionToken<(...args: unknown[]) => Observable<T>>,
  key: string,
  initialBehavior?: ProviderInitialBehavior<T>,
  meta?: MockResourceMeta,
  options?: MockProviderOptions,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const discriminator = options?.keyDiscriminator;
      return (...args: unknown[]): Observable<T> => {
        const effectiveKey = discriminator ? `${key}:${discriminator()}` : key;
        const ref = createMockResourceRef<T>();
        bus.register(effectiveKey, ref, meta);
        const internal = ref as MockResourceRefInternal<T>;

        if (initialBehavior) {
          ref.onRequest(() => {
            if (!bus.isCatchMode(effectiveKey)) applyBehavior(ref, initialBehavior);
          });
        }

        return new Observable<T>((subscriber) => {
          // Listen before notifying: a synchronous initialBehavior settles inside _notifyRequest.
          const stop = internal._onSettle((outcome) => {
            if ('error' in outcome) {
              subscriber.error(outcome.error);
            } else {
              subscriber.next(outcome.value);
              subscriber.complete();
            }
          });
          internal._notifyRequest(args);
          return stop;
        });
      };
    },
  };
}
