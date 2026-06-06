import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerParams =
  paths['/v1/customers/{customer}']['get']['parameters']['query'];

export type GetCustomersCustomerResponse =
  paths['/v1/customers/{customer}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER = new InjectionToken<
  (
    customer: string,
    params?:
      | GetCustomersCustomerParams
      | (() => GetCustomersCustomerParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersCustomerResponse>>
>('GET_CUSTOMERS_CUSTOMER');

export function provideGetCustomersCustomer(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        params?:
          | GetCustomersCustomerParams
          | (() => GetCustomersCustomerParams | undefined),
      ) =>
        httpResource<GetCustomersCustomerResponse>(() => ({
          url: `${base}/v1/customers/${customer}`,
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
