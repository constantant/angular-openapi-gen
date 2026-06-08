import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MockResourceBus } from './mock-resource-bus';
import {
  createMockResourceRef,
  type MockResourceState,
  type MockResourceRefInternal,
} from './mock-resource-ref';

type DeepPartial<T> = T extends Array<infer E>
  ? DeepPartial<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type ProviderInitialState<T> =
  | { value: DeepPartial<T> }
  | { loading: true }
  | { error: unknown };

export function provideMockResource<T>(
  token: InjectionToken<(...args: unknown[]) => ReturnType<typeof httpResource<T>>>,
  key: string,
  initialState?: ProviderInitialState<T>,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const ref = createMockResourceRef<T>(initialState as MockResourceState<T>);
      bus.register(key, ref);
      return (...args: unknown[]): ReturnType<typeof httpResource<T>> => {
        (ref as MockResourceRefInternal<T>)._notifyRequest(args);
        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}
