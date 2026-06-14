import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_SUSPEND_INSTALLATION = new InjectionToken<
  (installationId: string) => ReturnType<typeof httpResource<unknown>>
>('APPS_SUSPEND_INSTALLATION');

export function provideAppsSuspendInstallation(): FactoryProvider {
  return {
    provide: APPS_SUSPEND_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (installationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/app/installations/${installationId}/suspended`,
          method: 'PUT',
        }));
    },
  };
}
