import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostSubscriptionItemsBody = NonNullable<
  paths['/v1/subscription_items']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostSubscriptionItemsResponse =
  paths['/v1/subscription_items']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_ITEMS = new InjectionToken<
  (
    body: PostSubscriptionItemsBody | Signal<PostSubscriptionItemsBody>,
  ) => ReturnType<typeof httpResource<PostSubscriptionItemsResponse>>
>('POST_SUBSCRIPTION_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostSubscriptionItemsBody | Signal<PostSubscriptionItemsBody>,
    ) =>
      httpResource<PostSubscriptionItemsResponse>(() => ({
        url: `${base}/v1/subscription_items`,
        method: 'POST',
        body,
      }));
  },
});
