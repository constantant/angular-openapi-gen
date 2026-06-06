import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody =
  NonNullable<
    paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID =
  new InjectionToken<
    (
      customer: string,
      subscriptionExposedId: string,
      body:
        | PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody
        | Signal<PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
    ) => ReturnType<
      typeof httpResource<PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>
    >
  >('POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID');

export function providePostCustomersCustomerSubscriptionsSubscriptionExposedId(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        subscriptionExposedId: string,
        body:
          | PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody
          | Signal<PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
      ) =>
        httpResource<PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/subscriptions/${subscriptionExposedId}`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
