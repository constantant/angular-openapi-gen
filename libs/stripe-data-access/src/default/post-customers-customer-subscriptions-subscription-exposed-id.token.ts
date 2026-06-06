import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody = NonNullable<
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID =
  new InjectionToken<
    (
      customer: string,
      subscription_exposed_id: string,
      body:
        | PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody
        | Signal<PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
    ) => ReturnType<
      typeof httpResource<PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>
    >
  >('POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        subscription_exposed_id: string,
        body:
          | PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody
          | Signal<PostCustomersCustomerSubscriptionsSubscriptionExposedIdBody>,
      ) =>
        httpResource<PostCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/subscriptions/${subscription_exposed_id}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
