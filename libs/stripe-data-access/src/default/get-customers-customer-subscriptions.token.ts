import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerSubscriptionsParams =
  paths['/v1/customers/{customer}/subscriptions']['get']['parameters']['query'];

export type GetCustomersCustomerSubscriptionsResponse =
  paths['/v1/customers/{customer}/subscriptions']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS = new InjectionToken<
  (
    customer: string,
    params?:
      | GetCustomersCustomerSubscriptionsParams
      | (() => GetCustomersCustomerSubscriptionsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetCustomersCustomerSubscriptionsResponse>
  >
>('GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS');

export function provideGetCustomersCustomerSubscriptions(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        params?:
          | GetCustomersCustomerSubscriptionsParams
          | (() => GetCustomersCustomerSubscriptionsParams | undefined),
      ) =>
        httpResource<GetCustomersCustomerSubscriptionsResponse>(() => ({
          url: `${base}/v1/customers/${customer}/subscriptions`,
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
