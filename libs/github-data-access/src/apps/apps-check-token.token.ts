import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsCheckTokenBody = NonNullable<
  paths['/applications/{client_id}/token']['post']['requestBody']
>['content']['application/json'];

export type AppsCheckTokenResponse =
  paths['/applications/{client_id}/token']['post']['responses']['200']['content']['application/json'];

export const APPS_CHECK_TOKEN = new InjectionToken<
  (
    clientId: string,
    body: AppsCheckTokenBody | Signal<AppsCheckTokenBody>,
  ) => ReturnType<typeof httpResource<AppsCheckTokenResponse>>
>('APPS_CHECK_TOKEN');

export function provideAppsCheckToken(): FactoryProvider {
  return {
    provide: APPS_CHECK_TOKEN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        clientId: string,
        body: AppsCheckTokenBody | Signal<AppsCheckTokenBody>,
      ) =>
        httpResource<AppsCheckTokenResponse>(() => ({
          url: `${base}/applications/${clientId}/token`,
          method: 'POST',
          body,
        }));
    },
  };
}
