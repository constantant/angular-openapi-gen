import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdParams =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['get']['parameters']['query'];

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID =
  new InjectionToken<
    (
      customer: string,
      subscriptionExposedId: string,
      params?:
        | GetCustomersCustomerSubscriptionsSubscriptionExposedIdParams
        | (() =>
            | GetCustomersCustomerSubscriptionsSubscriptionExposedIdParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        subscriptionExposedId: string,
        params?:
          | GetCustomersCustomerSubscriptionsSubscriptionExposedIdParams
          | (() =>
              | GetCustomersCustomerSubscriptionsSubscriptionExposedIdParams
              | undefined),
      ) =>
        httpResource<GetCustomersCustomerSubscriptionsSubscriptionExposedIdResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/subscriptions/${subscriptionExposedId}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
