import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionsSubscriptionExposedIdParams =
  paths['/v1/subscriptions/{subscription_exposed_id}']['get']['parameters']['query'];

type GetSubscriptionsSubscriptionExposedIdResponse =
  paths['/v1/subscriptions/{subscription_exposed_id}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID = new InjectionToken<
  (
    subscription_exposed_id: string,
    params?: GetSubscriptionsSubscriptionExposedIdParams,
  ) => ReturnType<
    typeof httpResource<GetSubscriptionsSubscriptionExposedIdResponse>
  >
>('GET_SUBSCRIPTIONS_SUBSCRIPTION_EXPOSED_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      subscription_exposed_id: string,
      params?: GetSubscriptionsSubscriptionExposedIdParams,
    ) =>
      httpResource<GetSubscriptionsSubscriptionExposedIdResponse>(() => ({
        url: `${base}/v1/subscriptions/${subscription_exposed_id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
