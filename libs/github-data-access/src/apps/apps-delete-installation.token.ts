import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_DELETE_INSTALLATION = new InjectionToken<
  (installationId: string) => ReturnType<typeof httpResource<unknown>>
>('APPS_DELETE_INSTALLATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (installationId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/app/installations/${installationId}`,
        method: 'DELETE',
      }));
  },
});
