import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type GetTripsParams = paths['/trips']['get']['parameters']['query'];

export type GetTripsResponse =
  paths['/trips']['get']['responses']['200']['content']['application/json'];

export const GET_TRIPS = new InjectionToken<
  (
    params?: GetTripsParams | (() => GetTripsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTripsResponse>>
>('GET_TRIPS');

export function provideGetTrips(): FactoryProvider {
  return {
    provide: GET_TRIPS,
    useFactory: () => {
      const base = inject(TRAVEL_BASE_URL);
      return (params?: GetTripsParams | (() => GetTripsParams | undefined)) =>
        httpResource<GetTripsResponse>(() => ({
          url: `${base}/trips`,
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
