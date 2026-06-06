import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListPlansParams =
  paths['/marketplace_listing/plans']['get']['parameters']['query'];

export type AppsListPlansResponse =
  paths['/marketplace_listing/plans']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_PLANS = new InjectionToken<
  (
    params?: AppsListPlansParams | (() => AppsListPlansParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListPlansResponse>>
>('APPS_LIST_PLANS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?: AppsListPlansParams | (() => AppsListPlansParams | undefined),
    ) =>
      httpResource<AppsListPlansResponse>(() => ({
        url: `${base}/marketplace_listing/plans`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
