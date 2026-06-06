import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteSubscriptionsSubscriptionExposedIdBody = NonNullable<
  paths['/v1/subscriptions/{subscription_exposed_id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID = new InjectionToken<
  (
    subscriptionExposedId: string,
    body:
      | DeleteSubscriptionsSubscriptionExposedIdBody
      | Signal<DeleteSubscriptionsSubscriptionExposedIdBody>,
  ) => ReturnType<
    typeof httpResource<DeleteSubscriptionsSubscriptionExposedIdResponse>
  >
>('DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID');

export function provideDeleteSubscriptionsSubscriptionExposedId(): FactoryProvider {
  return {
    provide: DELETE_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        subscriptionExposedId: string,
        body:
          | DeleteSubscriptionsSubscriptionExposedIdBody
          | Signal<DeleteSubscriptionsSubscriptionExposedIdBody>,
      ) =>
        httpResource<DeleteSubscriptionsSubscriptionExposedIdResponse>(() => ({
          url: `${base}/v1/subscriptions/${subscriptionExposedId}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
