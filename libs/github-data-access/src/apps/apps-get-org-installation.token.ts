import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetOrgInstallationResponse =
  paths['/orgs/{org}/installation']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_ORG_INSTALLATION = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<AppsGetOrgInstallationResponse>>
>('APPS_GET_ORG_INSTALLATION');

export function provideAppsGetOrgInstallation(): FactoryProvider {
  return {
    provide: APPS_GET_ORG_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<AppsGetOrgInstallationResponse>(() => ({
          url: `${base}/orgs/${org}/installation`,
        }));
    },
  };
}
