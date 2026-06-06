import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalLocationsLocationBody = NonNullable<
  paths['/v1/terminal/locations/{location}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalLocationsLocationResponse =
  paths['/v1/terminal/locations/{location}']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_LOCATIONS_LOCATION = new InjectionToken<
  (
    location: string,
    body:
      | PostTerminalLocationsLocationBody
      | Signal<PostTerminalLocationsLocationBody>,
  ) => ReturnType<typeof httpResource<PostTerminalLocationsLocationResponse>>
>('POST_TERMINAL_LOCATIONS_LOCATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      location: string,
      body:
        | PostTerminalLocationsLocationBody
        | Signal<PostTerminalLocationsLocationBody>,
    ) =>
      httpResource<PostTerminalLocationsLocationResponse>(() => ({
        url: `${base}/v1/terminal/locations/${location}`,
        method: 'POST',
        body,
      }));
  },
});
