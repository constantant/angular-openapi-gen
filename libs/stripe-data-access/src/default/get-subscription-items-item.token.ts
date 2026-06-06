import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionItemsItemParams =
  paths['/v1/subscription_items/{item}']['get']['parameters']['query'];

export type GetSubscriptionItemsItemResponse =
  paths['/v1/subscription_items/{item}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    params?:
      | GetSubscriptionItemsItemParams
      | (() => GetSubscriptionItemsItemParams | undefined),
  ) => ReturnType<typeof httpResource<GetSubscriptionItemsItemResponse>>
>('GET_SUBSCRIPTION_ITEMS_ITEM');

export function provideGetSubscriptionItemsItem(): FactoryProvider {
  return {
    provide: GET_SUBSCRIPTION_ITEMS_ITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        item: string,
        params?:
          | GetSubscriptionItemsItemParams
          | (() => GetSubscriptionItemsItemParams | undefined),
      ) =>
        httpResource<GetSubscriptionItemsItemResponse>(() => ({
          url: `${base}/v1/subscription_items/${item}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
