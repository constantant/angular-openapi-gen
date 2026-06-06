import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountParams =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount']['get']['parameters']['query'];

type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT =
  new InjectionToken<
    (
      customer: string,
      subscription_exposed_id: string,
      params?: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountParams,
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        subscription_exposed_id: string,
        params?: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountParams,
      ) =>
        httpResource<GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/subscriptions/${subscription_exposed_id}/discount`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
