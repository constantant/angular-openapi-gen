import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetBySlugResponse =
  paths['/apps/{app_slug}']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_BY_SLUG = new InjectionToken<
  (appSlug: string) => ReturnType<typeof httpResource<AppsGetBySlugResponse>>
>('APPS_GET_BY_SLUG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (appSlug: string) =>
      httpResource<AppsGetBySlugResponse>(() => ({
        url: `${base}/apps/${appSlug}`,
      }));
  },
});
