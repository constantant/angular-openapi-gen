import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerCardsParams =
  paths['/v1/customers/{customer}/cards']['get']['parameters']['query'];

type GetCustomersCustomerCardsResponse =
  paths['/v1/customers/{customer}/cards']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_CARDS = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerCardsParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerCardsResponse>>
>('GET_CUSTOMERS_CUSTOMER_CARDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (customer: string, params?: GetCustomersCustomerCardsParams) =>
      httpResource<GetCustomersCustomerCardsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/cards`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
