import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

type GetTripsParams = paths['/trips']['get']['parameters']['query'];

type GetTripsResponse =
  paths['/trips']['get']['responses']['200']['content']['application/json'];

export const GET_TRIPS = new InjectionToken<
  (params?: GetTripsParams) => ReturnType<typeof httpResource<GetTripsResponse>>
>('GET_TRIPS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return (params?: GetTripsParams) =>
      httpResource<GetTripsResponse>(() => ({
        url: `${base}/trips`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
