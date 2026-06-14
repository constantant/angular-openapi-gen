import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_UNSUSPEND_INSTALLATION = new InjectionToken<
  (installationId: string) => ReturnType<typeof httpResource<unknown>>
>('APPS_UNSUSPEND_INSTALLATION');

export function provideAppsUnsuspendInstallation(): FactoryProvider {
  return {
    provide: APPS_UNSUSPEND_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (installationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/app/installations/${installationId}/suspended`,
          method: 'DELETE',
        }));
    },
  };
}
