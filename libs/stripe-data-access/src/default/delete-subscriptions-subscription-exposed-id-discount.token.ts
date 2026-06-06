import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteSubscriptionsSubscriptionExposedIdDiscountBody = NonNullable<
  paths['/v1/subscriptions/{subscription_exposed_id}/discount']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteSubscriptionsSubscriptionExposedIdDiscountResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}/discount']['delete']['responses']['200']['content']['application/json'];

export const DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT =
  new InjectionToken<
    (
      subscriptionExposedId: string,
      body:
        | DeleteSubscriptionsSubscriptionExposedIdDiscountBody
        | Signal<DeleteSubscriptionsSubscriptionExposedIdDiscountBody>,
    ) => ReturnType<
      typeof httpResource<DeleteSubscriptionsSubscriptionExposedIdDiscountResponse>
    >
  >('DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID_DISCOUNT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        subscriptionExposedId: string,
        body:
          | DeleteSubscriptionsSubscriptionExposedIdDiscountBody
          | Signal<DeleteSubscriptionsSubscriptionExposedIdDiscountBody>,
      ) =>
        httpResource<DeleteSubscriptionsSubscriptionExposedIdDiscountResponse>(
          () => ({
            url: `${base}/v1/subscriptions/${subscriptionExposedId}/discount`,
            method: 'DELETE',
            body,
          }),
        );
    },
  });
