import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerParams =
  paths['/v1/customers/{customer}']['get']['parameters']['query'];

type GetCustomersCustomerResponse =
  paths['/v1/customers/{customer}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerResponse>>
>('GET_CUSTOMERS_CUSTOMER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (customer: string, params?: GetCustomersCustomerParams) =>
      httpResource<GetCustomersCustomerResponse>(() => ({
        url: `${base}/v1/customers/${customer}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
