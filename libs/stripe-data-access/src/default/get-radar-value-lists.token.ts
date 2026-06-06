import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetRadarValueListsParams =
  paths['/v1/radar/value_lists']['get']['parameters']['query'];

type GetRadarValueListsResponse =
  paths['/v1/radar/value_lists']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_VALUE_LISTS = new InjectionToken<
  (
    params?: GetRadarValueListsParams,
  ) => ReturnType<typeof httpResource<GetRadarValueListsResponse>>
>('GET_RADAR_VALUE_LISTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetRadarValueListsParams) =>
      httpResource<GetRadarValueListsResponse>(() => ({
        url: `${base}/v1/radar/value_lists`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
