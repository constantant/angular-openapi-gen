import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteSubscriptionsSubscriptionExposedIdBody = NonNullable<
  paths['/v1/subscriptions/{subscription_exposed_id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID = new InjectionToken<
  (
    subscription_exposed_id: string,
    body:
      | DeleteSubscriptionsSubscriptionExposedIdBody
      | Signal<DeleteSubscriptionsSubscriptionExposedIdBody>,
  ) => ReturnType<
    typeof httpResource<DeleteSubscriptionsSubscriptionExposedIdResponse>
  >
>('DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      subscription_exposed_id: string,
      body:
        | DeleteSubscriptionsSubscriptionExposedIdBody
        | Signal<DeleteSubscriptionsSubscriptionExposedIdBody>,
    ) =>
      httpResource<DeleteSubscriptionsSubscriptionExposedIdResponse>(() => ({
        url: `${base}/v1/subscriptions/${subscription_exposed_id}`,
        method: 'DELETE',
        body,
      }));
  },
});
