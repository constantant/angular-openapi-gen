import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostSubscriptionItemsItemBody = NonNullable<
  paths['/v1/subscription_items/{item}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostSubscriptionItemsItemResponse =
  paths['/v1/subscription_items/{item}']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    body: PostSubscriptionItemsItemBody | Signal<PostSubscriptionItemsItemBody>,
  ) => ReturnType<typeof httpResource<PostSubscriptionItemsItemResponse>>
>('POST_SUBSCRIPTION_ITEMS_ITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      item: string,
      body:
        | PostSubscriptionItemsItemBody
        | Signal<PostSubscriptionItemsItemBody>,
    ) =>
      httpResource<PostSubscriptionItemsItemResponse>(() => ({
        url: `${base}/v1/subscription_items/${item}`,
        method: 'POST',
        body,
      }));
  },
});
