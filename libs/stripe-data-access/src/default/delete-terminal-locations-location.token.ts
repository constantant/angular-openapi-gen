import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteTerminalLocationsLocationBody = NonNullable<
  paths['/v1/terminal/locations/{location}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteTerminalLocationsLocationResponse =
  paths['/v1/terminal/locations/{location}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_TERMINAL_LOCATIONS_LOCATION = new InjectionToken<
  (
    location: string,
    body:
      | DeleteTerminalLocationsLocationBody
      | Signal<DeleteTerminalLocationsLocationBody>,
  ) => ReturnType<typeof httpResource<DeleteTerminalLocationsLocationResponse>>
>('DELETE_TERMINAL_LOCATIONS_LOCATION');

export function provideDeleteTerminalLocationsLocation(): FactoryProvider {
  return {
    provide: DELETE_TERMINAL_LOCATIONS_LOCATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        location: string,
        body:
          | DeleteTerminalLocationsLocationBody
          | Signal<DeleteTerminalLocationsLocationBody>,
      ) =>
        httpResource<DeleteTerminalLocationsLocationResponse>(() => ({
          url: `${base}/v1/terminal/locations/${location}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
