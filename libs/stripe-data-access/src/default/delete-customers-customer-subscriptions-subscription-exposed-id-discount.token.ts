import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountBody =
  NonNullable<
    paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount']['delete']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse =
  paths['/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT =
  new InjectionToken<
    (
      customer: string,
      subscription_exposed_id: string,
      body:
        | DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountBody
        | Signal<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountBody>,
    ) => ReturnType<
      typeof httpResource<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse>
    >
  >(
    'DELETE_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(STRIPE_BASE_URL);
        return (
          customer: string,
          subscription_exposed_id: string,
          body:
            | DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountBody
            | Signal<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountBody>,
        ) =>
          httpResource<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse>(
            () => ({
              url: `${base}/v1/customers/${customer}/subscriptions/${subscription_exposed_id}/discount`,
              method: 'DELETE',
              body,
            }),
          );
      },
    },
  );
