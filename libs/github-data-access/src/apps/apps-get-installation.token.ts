import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetInstallationResponse =
  paths['/app/installations/{installation_id}']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_INSTALLATION = new InjectionToken<
  (
    installationId: string,
  ) => ReturnType<typeof httpResource<AppsGetInstallationResponse>>
>('APPS_GET_INSTALLATION');

export function provideAppsGetInstallation(): FactoryProvider {
  return {
    provide: APPS_GET_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (installationId: string) =>
        httpResource<AppsGetInstallationResponse>(() => ({
          url: `${base}/app/installations/${installationId}`,
        }));
    },
  };
}
