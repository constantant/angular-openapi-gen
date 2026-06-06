import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetRadarValueListItemsItemParams =
  paths['/v1/radar/value_list_items/{item}']['get']['parameters']['query'];

type GetRadarValueListItemsItemResponse =
  paths['/v1/radar/value_list_items/{item}']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LIST_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    params?: GetRadarValueListItemsItemParams,
  ) => ReturnType<typeof httpResource<GetRadarValueListItemsItemResponse>>
>('GET_RADAR_VALUE_LIST_ITEMS_ITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (item: string, params?: GetRadarValueListItemsItemParams) =>
      httpResource<GetRadarValueListItemsItemResponse>(() => ({
        url: `${base}/v1/radar/value_list_items/${item}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
