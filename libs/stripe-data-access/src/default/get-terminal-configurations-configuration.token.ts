import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalConfigurationsConfigurationParams =
  paths['/v1/terminal/configurations/{configuration}']['get']['parameters']['query'];

export type GetTerminalConfigurationsConfigurationResponse =
  paths['/v1/terminal/configurations/{configuration}']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_CONFIGURATIONS_CONFIGURATION = new InjectionToken<
  (
    configuration: string,
    params?:
      | GetTerminalConfigurationsConfigurationParams
      | (() => GetTerminalConfigurationsConfigurationParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetTerminalConfigurationsConfigurationResponse>
  >
>('GET_TERMINAL_CONFIGURATIONS_CONFIGURATION');

export function provideGetTerminalConfigurationsConfiguration(): FactoryProvider {
  return {
    provide: GET_TERMINAL_CONFIGURATIONS_CONFIGURATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        params?:
          | GetTerminalConfigurationsConfigurationParams
          | (() => GetTerminalConfigurationsConfigurationParams | undefined),
      ) =>
        httpResource<GetTerminalConfigurationsConfigurationResponse>(() => ({
          url: `${base}/v1/terminal/configurations/${configuration}`,
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
