import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_REVOKE_INSTALLATION_ACCESS_TOKEN = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('APPS_REVOKE_INSTALLATION_ACCESS_TOKEN');

export function provideAppsRevokeInstallationAccessToken(): FactoryProvider {
  return {
    provide: APPS_REVOKE_INSTALLATION_ACCESS_TOKEN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<unknown>(() => ({
          url: `${base}/installation/token`,
          method: 'DELETE',
        }));
    },
  };
}
