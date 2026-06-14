import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('APPS_LIST_PLANS');

export function provideAppsListPlans(): FactoryProvider {
  return {
    provide: APPS_LIST_PLANS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: AppsListPlansParams | (() => AppsListPlansParams | undefined),
      ) =>
        httpResource<AppsListPlansResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/marketplace_listing/plans`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
