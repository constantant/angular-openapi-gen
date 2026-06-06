import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerSourcesIdParams =
  paths['/v1/customers/{customer}/sources/{id}']['get']['parameters']['query'];

type GetCustomersCustomerSourcesIdResponse =
  paths['/v1/customers/{customer}/sources/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SOURCES_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?: GetCustomersCustomerSourcesIdParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerSourcesIdResponse>>
>('GET_CUSTOMERS_CUSTOMER_SOURCES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      params?: GetCustomersCustomerSourcesIdParams,
    ) =>
      httpResource<GetCustomersCustomerSourcesIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
