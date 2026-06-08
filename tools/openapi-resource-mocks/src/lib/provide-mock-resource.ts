import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MockResourceBus } from './mock-resource-bus';
import { createMockResourceRef, type MockResourceRefInternal } from './mock-resource-ref';

type DeepPartial<T> = T extends Array<infer E>
  ? DeepPartial<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type ProviderInitialBehavior<T> =
  | { value: DeepPartial<T>; delay?: number }
  | { loading: true }
  | { error: unknown; delay?: number };

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
        (ref as MockResourceRefInternal<T>)._notifyRequest(args);
        if (initialBehavior) {
          if ('value' in initialBehavior) {
            if (initialBehavior.delay) {
              ref.resolveAfter(initialBehavior.delay, initialBehavior.value as T);
            } else {
              ref.resolve(initialBehavior.value as T);
            }
          } else if ('error' in initialBehavior) {
            if (initialBehavior.delay) {
              ref.setLoading();
              setTimeout(() => ref.fail(initialBehavior.error), initialBehavior.delay);
            } else {
              ref.fail(initialBehavior.error);
            }
          } else {
            ref.setLoading();
          }
        }
        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}
