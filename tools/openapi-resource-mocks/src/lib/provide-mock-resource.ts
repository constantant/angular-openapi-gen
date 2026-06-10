import { InjectionToken, inject, effect, untracked, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MockResourceBus } from './mock-resource-bus';
import { createMockResourceRef, type MockResourceRef, type MockResourceRefInternal } from './mock-resource-ref';

export type DeepPartial<T> = T extends Array<infer E>
  ? DeepPartial<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type ProviderInitialBehavior<T> =
  | { value: DeepPartial<T>; delay?: number }
  | { loading: true }
  | { error: unknown; delay?: number };

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
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      return (...args: unknown[]): ReturnType<typeof httpResource<T>> => {
        const ref = createMockResourceRef<T>();
        bus.register(key, ref);
        const internal = ref as MockResourceRefInternal<T>;

        // Synchronous initial notification — preserves existing test/E2E behaviour.
        internal._notifyRequest(args);
        if (initialBehavior) applyBehavior(ref, initialBehavior);

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
              if (first) { first = false; return; } // first run already handled above
              internal._notifyRequest(resolved);
              if (initialBehavior) applyBehavior(ref, initialBehavior);
            });
          });
        }

        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}
