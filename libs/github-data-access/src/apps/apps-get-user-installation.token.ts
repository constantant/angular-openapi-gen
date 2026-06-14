import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetUserInstallationResponse =
  paths['/users/{username}/installation']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_USER_INSTALLATION = new InjectionToken<
  (
    username: string,
  ) => ReturnType<typeof httpResource<AppsGetUserInstallationResponse>>
>('APPS_GET_USER_INSTALLATION');

export function provideAppsGetUserInstallation(): FactoryProvider {
  return {
    provide: APPS_GET_USER_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        httpResource<AppsGetUserInstallationResponse>(() => ({
          url: `${base}/users/${username}/installation`,
        }));
    },
  };
}
