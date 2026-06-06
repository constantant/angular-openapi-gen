import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsScopeTokenBody = NonNullable<
  paths['/applications/{client_id}/token/scoped']['post']['requestBody']
>['content']['application/json'];

export type AppsScopeTokenResponse =
  paths['/applications/{client_id}/token/scoped']['post']['responses']['200']['content']['application/json'];

export const APPS_SCOPE_TOKEN = new InjectionToken<
  (
    clientId: string,
    body: AppsScopeTokenBody | Signal<AppsScopeTokenBody>,
  ) => ReturnType<typeof httpResource<AppsScopeTokenResponse>>
>('APPS_SCOPE_TOKEN');

export function provideAppsScopeToken(): FactoryProvider {
  return {
    provide: APPS_SCOPE_TOKEN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        clientId: string,
        body: AppsScopeTokenBody | Signal<AppsScopeTokenBody>,
      ) =>
        httpResource<AppsScopeTokenResponse>(() => ({
          url: `${base}/applications/${clientId}/token/scoped`,
          method: 'POST',
          body,
        }));
    },
  };
}
