import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerSourcesIdParams =
  paths['/v1/customers/{customer}/sources/{id}']['get']['parameters']['query'];

export type GetCustomersCustomerSourcesIdResponse =
  paths['/v1/customers/{customer}/sources/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SOURCES_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?:
      | GetCustomersCustomerSourcesIdParams
      | (() => GetCustomersCustomerSourcesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersCustomerSourcesIdResponse>>
>('GET_CUSTOMERS_CUSTOMER_SOURCES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      params?:
        | GetCustomersCustomerSourcesIdParams
        | (() => GetCustomersCustomerSourcesIdParams | undefined),
    ) =>
      httpResource<GetCustomersCustomerSourcesIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
