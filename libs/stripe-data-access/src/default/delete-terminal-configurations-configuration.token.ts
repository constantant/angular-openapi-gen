import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteTerminalConfigurationsConfigurationBody = NonNullable<
  paths['/v1/terminal/configurations/{configuration}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteTerminalConfigurationsConfigurationResponse =
  paths['/v1/terminal/configurations/{configuration}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_TERMINAL_CONFIGURATIONS_CONFIGURATION = new InjectionToken<
  (
    configuration: string,
    body:
      | DeleteTerminalConfigurationsConfigurationBody
      | Signal<DeleteTerminalConfigurationsConfigurationBody>,
  ) => ReturnType<
    typeof httpResource<DeleteTerminalConfigurationsConfigurationResponse>
  >
>('DELETE_TERMINAL_CONFIGURATIONS_CONFIGURATION');

export function provideDeleteTerminalConfigurationsConfiguration(): FactoryProvider {
  return {
    provide: DELETE_TERMINAL_CONFIGURATIONS_CONFIGURATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        body:
          | DeleteTerminalConfigurationsConfigurationBody
          | Signal<DeleteTerminalConfigurationsConfigurationBody>,
      ) =>
        httpResource<DeleteTerminalConfigurationsConfigurationResponse>(() => ({
          url: `${base}/v1/terminal/configurations/${configuration}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
