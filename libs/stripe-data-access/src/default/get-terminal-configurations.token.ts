import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalConfigurationsParams =
  paths['/v1/terminal/configurations']['get']['parameters']['query'];

export type GetTerminalConfigurationsResponse =
  paths['/v1/terminal/configurations']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_CONFIGURATIONS = new InjectionToken<
  (
    params?:
      | GetTerminalConfigurationsParams
      | (() => GetTerminalConfigurationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTerminalConfigurationsResponse>>
>('GET_TERMINAL_CONFIGURATIONS');

export function provideGetTerminalConfigurations(): FactoryProvider {
  return {
    provide: GET_TERMINAL_CONFIGURATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTerminalConfigurationsParams
          | (() => GetTerminalConfigurationsParams | undefined),
      ) =>
        httpResource<GetTerminalConfigurationsResponse>(() => ({
          url: `${base}/v1/terminal/configurations`,
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
