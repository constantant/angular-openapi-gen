import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteRadarValueListItemsItemBody = NonNullable<
  paths['/v1/radar/value_list_items/{item}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteRadarValueListItemsItemResponse =
  paths['/v1/radar/value_list_items/{item}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_RADAR_VALUE_LIST_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    body:
      | DeleteRadarValueListItemsItemBody
      | Signal<DeleteRadarValueListItemsItemBody>,
  ) => ReturnType<typeof httpResource<DeleteRadarValueListItemsItemResponse>>
>('DELETE_RADAR_VALUE_LIST_ITEMS_ITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      item: string,
      body:
        | DeleteRadarValueListItemsItemBody
        | Signal<DeleteRadarValueListItemsItemBody>,
    ) =>
      httpResource<DeleteRadarValueListItemsItemResponse>(() => ({
        url: `${base}/v1/radar/value_list_items/${item}`,
        method: 'DELETE',
        body,
      }));
  },
});
