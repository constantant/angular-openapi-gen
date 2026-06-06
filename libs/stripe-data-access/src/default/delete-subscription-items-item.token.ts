import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteSubscriptionItemsItemBody = NonNullable<
  paths['/v1/subscription_items/{item}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteSubscriptionItemsItemResponse =
  paths['/v1/subscription_items/{item}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_SUBSCRIPTION_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    body:
      | DeleteSubscriptionItemsItemBody
      | Signal<DeleteSubscriptionItemsItemBody>,
  ) => ReturnType<typeof httpResource<DeleteSubscriptionItemsItemResponse>>
>('DELETE_SUBSCRIPTION_ITEMS_ITEM');

export function provideDeleteSubscriptionItemsItem(): FactoryProvider {
  return {
    provide: DELETE_SUBSCRIPTION_ITEMS_ITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        item: string,
        body:
          | DeleteSubscriptionItemsItemBody
          | Signal<DeleteSubscriptionItemsItemBody>,
      ) =>
        httpResource<DeleteSubscriptionItemsItemResponse>(() => ({
          url: `${base}/v1/subscription_items/${item}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
