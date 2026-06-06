import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionItemsParams =
  paths['/v1/subscription_items']['get']['parameters']['query'];

type GetSubscriptionItemsResponse =
  paths['/v1/subscription_items']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_ITEMS = new InjectionToken<
  (
    params?: GetSubscriptionItemsParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionItemsResponse>>
>('GET_SUBSCRIPTION_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSubscriptionItemsParams) =>
      httpResource<GetSubscriptionItemsResponse>(() => ({
        url: `${base}/v1/subscription_items`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
