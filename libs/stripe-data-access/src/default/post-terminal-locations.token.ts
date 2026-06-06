import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalLocationsBody = NonNullable<
  paths['/v1/terminal/locations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalLocationsResponse =
  paths['/v1/terminal/locations']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_LOCATIONS = new InjectionToken<
  (
    body: PostTerminalLocationsBody | Signal<PostTerminalLocationsBody>,
  ) => ReturnType<typeof httpResource<PostTerminalLocationsResponse>>
>('POST_TERMINAL_LOCATIONS');

export function providePostTerminalLocations(): FactoryProvider {
  return {
    provide: POST_TERMINAL_LOCATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body: PostTerminalLocationsBody | Signal<PostTerminalLocationsBody>,
      ) =>
        httpResource<PostTerminalLocationsResponse>(() => ({
          url: `${base}/v1/terminal/locations`,
          method: 'POST',
          body,
        }));
    },
  };
}
