import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTerminalLocationsLocationParams =
  paths['/v1/terminal/locations/{location}']['get']['parameters']['query'];

type GetTerminalLocationsLocationResponse =
  paths['/v1/terminal/locations/{location}']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_LOCATIONS_LOCATION = new InjectionToken<
  (
    location: string,
    params?: GetTerminalLocationsLocationParams,
  ) => ReturnType<typeof httpResource<GetTerminalLocationsLocationResponse>>
>('GET_TERMINAL_LOCATIONS_LOCATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (location: string, params?: GetTerminalLocationsLocationParams) =>
      httpResource<GetTerminalLocationsLocationResponse>(() => ({
        url: `${base}/v1/terminal/locations/${location}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
