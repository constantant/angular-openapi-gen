import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRadarValueListsValueListParams =
  paths['/v1/radar/value_lists/{value_list}']['get']['parameters']['query'];

export type GetRadarValueListsValueListResponse =
  paths['/v1/radar/value_lists/{value_list}']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LISTS_VALUE_LIST = new InjectionToken<
  (
    valueList: string,
    params?:
      | GetRadarValueListsValueListParams
      | (() => GetRadarValueListsValueListParams | undefined),
  ) => ReturnType<typeof httpResource<GetRadarValueListsValueListResponse>>
>('GET_RADAR_VALUE_LISTS_VALUE_LIST');

export function provideGetRadarValueListsValueList(): FactoryProvider {
  return {
    provide: GET_RADAR_VALUE_LISTS_VALUE_LIST,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        valueList: string,
        params?:
          | GetRadarValueListsValueListParams
          | (() => GetRadarValueListsValueListParams | undefined),
      ) =>
        httpResource<GetRadarValueListsValueListResponse>(() => ({
          url: `${base}/v1/radar/value_lists/${valueList}`,
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
