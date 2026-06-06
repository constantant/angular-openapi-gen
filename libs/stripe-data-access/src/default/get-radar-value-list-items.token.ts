import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRadarValueListItemsParams =
  paths['/v1/radar/value_list_items']['get']['parameters']['query'];

export type GetRadarValueListItemsResponse =
  paths['/v1/radar/value_list_items']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LIST_ITEMS = new InjectionToken<
  (
    params?:
      | GetRadarValueListItemsParams
      | (() => GetRadarValueListItemsParams | undefined),
  ) => ReturnType<typeof httpResource<GetRadarValueListItemsResponse>>
>('GET_RADAR_VALUE_LIST_ITEMS');

export function provideGetRadarValueListItems(): FactoryProvider {
  return {
    provide: GET_RADAR_VALUE_LIST_ITEMS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetRadarValueListItemsParams
          | (() => GetRadarValueListItemsParams | undefined),
      ) =>
        httpResource<GetRadarValueListItemsResponse>(() => ({
          url: `${base}/v1/radar/value_list_items`,
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
