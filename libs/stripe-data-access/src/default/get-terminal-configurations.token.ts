import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTerminalConfigurationsParams =
  paths['/v1/terminal/configurations']['get']['parameters']['query'];

type GetTerminalConfigurationsResponse =
  paths['/v1/terminal/configurations']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_CONFIGURATIONS = new InjectionToken<
  (
    params?: GetTerminalConfigurationsParams,
  ) => ReturnType<typeof httpResource<GetTerminalConfigurationsResponse>>
>('GET_TERMINAL_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTerminalConfigurationsParams) =>
      httpResource<GetTerminalConfigurationsResponse>(() => ({
        url: `${base}/v1/terminal/configurations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
