import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTerminalConfigurationsConfigurationBody = NonNullable<
  paths['/v1/terminal/configurations/{configuration}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTerminalConfigurationsConfigurationResponse =
  paths['/v1/terminal/configurations/{configuration}']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_CONFIGURATIONS_CONFIGURATION = new InjectionToken<
  (
    configuration: string,
    body:
      | PostTerminalConfigurationsConfigurationBody
      | Signal<PostTerminalConfigurationsConfigurationBody>,
  ) => ReturnType<
    typeof httpResource<PostTerminalConfigurationsConfigurationResponse>
  >
>('POST_TERMINAL_CONFIGURATIONS_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      configuration: string,
      body:
        | PostTerminalConfigurationsConfigurationBody
        | Signal<PostTerminalConfigurationsConfigurationBody>,
    ) =>
      httpResource<PostTerminalConfigurationsConfigurationResponse>(() => ({
        url: `${base}/v1/terminal/configurations/${configuration}`,
        method: 'POST',
        body,
      }));
  },
});
