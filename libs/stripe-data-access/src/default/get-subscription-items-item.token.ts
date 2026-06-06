import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionItemsItemParams =
  paths['/v1/subscription_items/{item}']['get']['parameters']['query'];

type GetSubscriptionItemsItemResponse =
  paths['/v1/subscription_items/{item}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    params?: GetSubscriptionItemsItemParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionItemsItemResponse>>
>('GET_SUBSCRIPTION_ITEMS_ITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (item: string, params?: GetSubscriptionItemsItemParams) =>
      httpResource<GetSubscriptionItemsItemResponse>(() => ({
        url: `${base}/v1/subscription_items/${item}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
