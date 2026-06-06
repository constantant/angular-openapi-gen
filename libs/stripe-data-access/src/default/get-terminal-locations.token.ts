import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTerminalLocationsParams =
  paths['/v1/terminal/locations']['get']['parameters']['query'];

type GetTerminalLocationsResponse =
  paths['/v1/terminal/locations']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_LOCATIONS = new InjectionToken<
  (
    params?: GetTerminalLocationsParams,
  ) => ReturnType<typeof httpResource<GetTerminalLocationsResponse>>
>('GET_TERMINAL_LOCATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTerminalLocationsParams) =>
      httpResource<GetTerminalLocationsResponse>(() => ({
        url: `${base}/v1/terminal/locations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
