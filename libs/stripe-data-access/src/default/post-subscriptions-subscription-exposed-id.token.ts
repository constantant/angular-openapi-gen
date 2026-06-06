import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionsSubscriptionExposedIdBody = NonNullable<
  paths['/v1/subscriptions/{subscription_exposed_id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID = new InjectionToken<
  (
    subscriptionExposedId: string,
    body:
      | PostSubscriptionsSubscriptionExposedIdBody
      | Signal<PostSubscriptionsSubscriptionExposedIdBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionsSubscriptionExposedIdResponse>
  >
>('POST_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID');

export function providePostSubscriptionsSubscriptionExposedId(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        subscriptionExposedId: string,
        body:
          | PostSubscriptionsSubscriptionExposedIdBody
          | Signal<PostSubscriptionsSubscriptionExposedIdBody>,
      ) =>
        httpResource<PostSubscriptionsSubscriptionExposedIdResponse>(() => ({
          url: `${base}/v1/subscriptions/${subscriptionExposedId}`,
          method: 'POST',
          body,
        }));
    },
  };
}
