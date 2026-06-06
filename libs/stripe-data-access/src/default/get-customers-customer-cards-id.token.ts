import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerCardsIdParams =
  paths['/v1/customers/{customer}/cards/{id}']['get']['parameters']['query'];

type GetCustomersCustomerCardsIdResponse =
  paths['/v1/customers/{customer}/cards/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_CARDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?: GetCustomersCustomerCardsIdParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerCardsIdResponse>>
>('GET_CUSTOMERS_CUSTOMER_CARDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      params?: GetCustomersCustomerCardsIdParams,
    ) =>
      httpResource<GetCustomersCustomerCardsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/cards/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
