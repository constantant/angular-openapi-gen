import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionsSubscriptionExposedIdParams =
  paths['/v1/subscriptions/{subscription_exposed_id}']['get']['parameters']['query'];

export type GetSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID = new InjectionToken<
  (
    subscriptionExposedId: string,
    params?:
      | GetSubscriptionsSubscriptionExposedIdParams
      | (() => GetSubscriptionsSubscriptionExposedIdParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetSubscriptionsSubscriptionExposedIdResponse>
  >
>('GET_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      subscriptionExposedId: string,
      params?:
        | GetSubscriptionsSubscriptionExposedIdParams
        | (() => GetSubscriptionsSubscriptionExposedIdParams | undefined),
    ) =>
      httpResource<GetSubscriptionsSubscriptionExposedIdResponse>(() => ({
        url: `${base}/v1/subscriptions/${subscriptionExposedId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
