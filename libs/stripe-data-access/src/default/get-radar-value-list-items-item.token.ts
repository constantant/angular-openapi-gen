import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRadarValueListItemsItemParams =
  paths['/v1/radar/value_list_items/{item}']['get']['parameters']['query'];

export type GetRadarValueListItemsItemResponse =
  paths['/v1/radar/value_list_items/{item}']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LIST_ITEMS_ITEM = new InjectionToken<
  (
    item: string,
    params?:
      | GetRadarValueListItemsItemParams
      | (() => GetRadarValueListItemsItemParams | undefined),
  ) => ReturnType<typeof httpResource<GetRadarValueListItemsItemResponse>>
>('GET_RADAR_VALUE_LIST_ITEMS_ITEM');

export function provideGetRadarValueListItemsItem(): FactoryProvider {
  return {
    provide: GET_RADAR_VALUE_LIST_ITEMS_ITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        item: string,
        params?:
          | GetRadarValueListItemsItemParams
          | (() => GetRadarValueListItemsItemParams | undefined),
      ) =>
        httpResource<GetRadarValueListItemsItemResponse>(() => ({
          url: `${base}/v1/radar/value_list_items/${item}`,
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
