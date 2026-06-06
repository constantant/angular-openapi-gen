import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTerminalConfigurationsBody = NonNullable<
  paths['/v1/terminal/configurations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTerminalConfigurationsResponse =
  paths['/v1/terminal/configurations']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_CONFIGURATIONS = new InjectionToken<
  (
    body:
      | PostTerminalConfigurationsBody
      | Signal<PostTerminalConfigurationsBody>,
  ) => ReturnType<typeof httpResource<PostTerminalConfigurationsResponse>>
>('POST_TERMINAL_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTerminalConfigurationsBody
        | Signal<PostTerminalConfigurationsBody>,
    ) =>
      httpResource<PostTerminalConfigurationsResponse>(() => ({
        url: `${base}/v1/terminal/configurations`,
        method: 'POST',
        body,
      }));
  },
});
