import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsCreateInstallationAccessTokenBody = NonNullable<
  paths['/app/installations/{installation_id}/access_tokens']['post']['requestBody']
>['content']['application/json'];

export type AppsCreateInstallationAccessTokenResponse =
  paths['/app/installations/{installation_id}/access_tokens']['post']['responses']['201']['content']['application/json'];

export const APPS_CREATE_INSTALLATION_ACCESS_TOKEN = new InjectionToken<
  (
    installationId: string,
    body:
      | AppsCreateInstallationAccessTokenBody
      | Signal<AppsCreateInstallationAccessTokenBody>,
  ) => ReturnType<
    typeof httpResource<AppsCreateInstallationAccessTokenResponse>
  >
>('APPS_CREATE_INSTALLATION_ACCESS_TOKEN');

export function provideAppsCreateInstallationAccessToken(): FactoryProvider {
  return {
    provide: APPS_CREATE_INSTALLATION_ACCESS_TOKEN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        installationId: string,
        body:
          | AppsCreateInstallationAccessTokenBody
          | Signal<AppsCreateInstallationAccessTokenBody>,
      ) =>
        httpResource<AppsCreateInstallationAccessTokenResponse>(() => ({
          url: `${base}/app/installations/${installationId}/access_tokens`,
          method: 'POST',
          body,
        }));
    },
  };
}
