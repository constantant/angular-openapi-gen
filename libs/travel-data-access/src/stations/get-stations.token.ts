import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type GetStationsParams =
  paths['/stations']['get']['parameters']['query'];

export type GetStationsResponse =
  paths['/stations']['get']['responses']['200']['content']['application/json'];

export const GET_STATIONS = new InjectionToken<
  (
    params?: GetStationsParams | (() => GetStationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetStationsResponse>>
>('GET_STATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return (
      params?: GetStationsParams | (() => GetStationsParams | undefined),
    ) =>
      httpResource<GetStationsResponse>(() => ({
        url: `${base}/stations`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
