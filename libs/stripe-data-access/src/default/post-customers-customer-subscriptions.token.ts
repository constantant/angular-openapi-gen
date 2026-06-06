import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerSubscriptionsBody = NonNullable<
  paths['/v1/customers/{customer}/subscriptions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerSubscriptionsResponse =
  paths['/v1/customers/{customer}/subscriptions']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerSubscriptionsBody
      | Signal<PostCustomersCustomerSubscriptionsBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerSubscriptionsResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS');

export function providePostCustomersCustomerSubscriptions(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        body:
          | PostCustomersCustomerSubscriptionsBody
          | Signal<PostCustomersCustomerSubscriptionsBody>,
      ) =>
        httpResource<PostCustomersCustomerSubscriptionsResponse>(() => ({
          url: `${base}/v1/customers/${customer}/subscriptions`,
          method: 'POST',
          body,
        }));
    },
  };
}
