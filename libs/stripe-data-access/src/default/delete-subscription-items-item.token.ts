import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteSubscriptionItemsItemBody = NonNullable<
  paths['/v1/subscription_items/{item}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteSubscriptionItemsItemResponse =
  paths['/v1/subscription_items/{item}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_SUBSCRIPTION_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    body:
      | DeleteSubscriptionItemsItemBody
      | Signal<DeleteSubscriptionItemsItemBody>,
  ) => ReturnType<typeof httpResource<DeleteSubscriptionItemsItemResponse>>
>('DELETE_SUBSCRIPTION_ITEMS_ITEM', {
  providedIn: 'root',
  factory: () => {
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
});
