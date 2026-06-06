import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerSourcesParams =
  paths['/v1/customers/{customer}/sources']['get']['parameters']['query'];

type GetCustomersCustomerSourcesResponse =
  paths['/v1/customers/{customer}/sources']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SOURCES = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerSourcesParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerSourcesResponse>>
>('GET_CUSTOMERS_CUSTOMER_SOURCES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (customer: string, params?: GetCustomersCustomerSourcesParams) =>
      httpResource<GetCustomersCustomerSourcesResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
