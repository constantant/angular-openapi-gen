import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalLocationsParams =
  paths['/v1/terminal/locations']['get']['parameters']['query'];

export type GetTerminalLocationsResponse =
  paths['/v1/terminal/locations']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_LOCATIONS = new InjectionToken<
  (
    params?:
      | GetTerminalLocationsParams
      | (() => GetTerminalLocationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTerminalLocationsResponse>>
>('GET_TERMINAL_LOCATIONS');

export function provideGetTerminalLocations(): FactoryProvider {
  return {
    provide: GET_TERMINAL_LOCATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTerminalLocationsParams
          | (() => GetTerminalLocationsParams | undefined),
      ) =>
        httpResource<GetTerminalLocationsResponse>(() => ({
          url: `${base}/v1/terminal/locations`,
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
