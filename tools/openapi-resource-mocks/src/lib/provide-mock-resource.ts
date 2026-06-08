import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MockResourceBus } from './mock-resource-bus';
import {
  createMockResourceRef,
  type MockResourceState,
  type MockResourceRefInternal,
} from './mock-resource-ref';

export function provideMockResource<T>(
  token: InjectionToken<(...args: unknown[]) => ReturnType<typeof httpResource<T>>>,
  key: string,
  initialState?: MockResourceState<T>,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const ref = createMockResourceRef<T>(initialState);
      bus.register(key, ref);
      return (...args: unknown[]): ReturnType<typeof httpResource<T>> => {
        (ref as MockResourceRefInternal<T>)._notifyRequest(args);
        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}
