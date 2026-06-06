import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

type GetBookingsParams = paths['/bookings']['get']['parameters']['query'];

type GetBookingsResponse =
  paths['/bookings']['get']['responses']['200']['content']['application/json'];

export const GET_BOOKINGS = new InjectionToken<
  (
    params?: GetBookingsParams,
  ) => ReturnType<typeof httpResource<GetBookingsResponse>>
>('GET_BOOKINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return (params?: GetBookingsParams) =>
      httpResource<GetBookingsResponse>(() => ({
        url: `${base}/bookings`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
