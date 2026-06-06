import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalLocationsLocationParams =
  paths['/v1/terminal/locations/{location}']['get']['parameters']['query'];

export type GetTerminalLocationsLocationResponse =
  paths['/v1/terminal/locations/{location}']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_LOCATIONS_LOCATION = new InjectionToken<
  (
    location: string,
    params?:
      | GetTerminalLocationsLocationParams
      | (() => GetTerminalLocationsLocationParams | undefined),
  ) => ReturnType<typeof httpResource<GetTerminalLocationsLocationResponse>>
>('GET_TERMINAL_LOCATIONS_LOCATION');

export function provideGetTerminalLocationsLocation(): FactoryProvider {
  return {
    provide: GET_TERMINAL_LOCATIONS_LOCATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        location: string,
        params?:
          | GetTerminalLocationsLocationParams
          | (() => GetTerminalLocationsLocationParams | undefined),
      ) =>
        httpResource<GetTerminalLocationsLocationResponse>(() => ({
          url: `${base}/v1/terminal/locations/${location}`,
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
