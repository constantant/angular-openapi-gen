import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostRadarValueListItemsBody = NonNullable<
  paths['/v1/radar/value_list_items']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostRadarValueListItemsResponse =
  paths['/v1/radar/value_list_items']['post']['responses']['200']['content']['application/json'];

export const POST_RADAR_VALUE_LIST_ITEMS = new InjectionToken<
  (
    body: PostRadarValueListItemsBody | Signal<PostRadarValueListItemsBody>,
  ) => ReturnType<typeof httpResource<PostRadarValueListItemsResponse>>
>('POST_RADAR_VALUE_LIST_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostRadarValueListItemsBody | Signal<PostRadarValueListItemsBody>,
    ) =>
      httpResource<PostRadarValueListItemsResponse>(() => ({
        url: `${base}/v1/radar/value_list_items`,
        method: 'POST',
        body,
      }));
  },
});
