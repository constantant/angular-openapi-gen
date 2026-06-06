import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetRadarValueListsValueListParams =
  paths['/v1/radar/value_lists/{value_list}']['get']['parameters']['query'];

type GetRadarValueListsValueListResponse =
  paths['/v1/radar/value_lists/{value_list}']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LISTS_VALUE_LIST = new InjectionToken<
  (
    value_list: string,
    params?: GetRadarValueListsValueListParams,
  ) => ReturnType<typeof httpResource<GetRadarValueListsValueListResponse>>
>('GET_RADAR_VALUE_LISTS_VALUE_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (value_list: string, params?: GetRadarValueListsValueListParams) =>
      httpResource<GetRadarValueListsValueListResponse>(() => ({
        url: `${base}/v1/radar/value_lists/${value_list}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
