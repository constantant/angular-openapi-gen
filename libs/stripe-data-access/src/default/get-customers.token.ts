import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersParams =
  paths['/v1/customers']['get']['parameters']['query'];

export type GetCustomersResponse =
  paths['/v1/customers']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS = new InjectionToken<
  (
    params?: GetCustomersParams | (() => GetCustomersParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersResponse>>
>('GET_CUSTOMERS');

export function provideGetCustomers(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetCustomersParams | (() => GetCustomersParams | undefined),
      ) =>
        httpResource<GetCustomersResponse>(() => ({
          url: `${base}/v1/customers`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
