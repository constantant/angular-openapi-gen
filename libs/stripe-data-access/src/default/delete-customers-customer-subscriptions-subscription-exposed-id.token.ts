import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdBody =
  NonNullable<
    paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['delete']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID =
  new InjectionToken<
    (
      customer: string,
      subscriptionExposedId: string,
      body:
        | DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdBody
        | Signal<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
    ) => ReturnType<
      typeof httpResource<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>
    >
  >('DELETE_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID');

export function provideDeleteCustomersCustomerSubscriptionsSubscriptionExposedId(): FactoryProvider {
  return {
    provide: DELETE_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        subscriptionExposedId: string,
        body:
          | DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdBody
          | Signal<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
      ) =>
        httpResource<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/subscriptions/${subscriptionExposedId}`,
            method: 'DELETE',
            body,
          }),
        );
    },
  };
}
