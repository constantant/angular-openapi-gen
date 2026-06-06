import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type GetBookingsParams =
  paths['/bookings']['get']['parameters']['query'];

export type GetBookingsResponse =
  paths['/bookings']['get']['responses']['200']['content']['application/json'];

export const GET_BOOKINGS = new InjectionToken<
  (
    params?: GetBookingsParams | (() => GetBookingsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBookingsResponse>>
>('GET_BOOKINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return (
      params?: GetBookingsParams | (() => GetBookingsParams | undefined),
    ) =>
      httpResource<GetBookingsResponse>(() => ({
        url: `${base}/bookings`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
