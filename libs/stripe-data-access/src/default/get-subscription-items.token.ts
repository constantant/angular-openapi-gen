import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionItemsParams =
  paths['/v1/subscription_items']['get']['parameters']['query'];

export type GetSubscriptionItemsResponse =
  paths['/v1/subscription_items']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_ITEMS = new InjectionToken<
  (
    params?:
      | GetSubscriptionItemsParams
      | (() => GetSubscriptionItemsParams | undefined),
  ) => ReturnType<typeof httpResource<GetSubscriptionItemsResponse>>
>('GET_SUBSCRIPTION_ITEMS');

export function provideGetSubscriptionItems(): FactoryProvider {
  return {
    provide: GET_SUBSCRIPTION_ITEMS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetSubscriptionItemsParams
          | (() => GetSubscriptionItemsParams | undefined),
      ) =>
        httpResource<GetSubscriptionItemsResponse>(() => ({
          url: `${base}/v1/subscription_items`,
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
