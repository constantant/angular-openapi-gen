import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetAuthenticatedResponse =
  paths['/app']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_AUTHENTICATED = new InjectionToken<
  () => ReturnType<typeof httpResource<AppsGetAuthenticatedResponse>>
>('APPS_GET_AUTHENTICATED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<AppsGetAuthenticatedResponse>(() => ({
        url: `${base}/app`,
      }));
  },
});
