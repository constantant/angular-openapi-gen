import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListPlansStubbedParams =
  paths['/marketplace_listing/stubbed/plans']['get']['parameters']['query'];

export type AppsListPlansStubbedResponse =
  paths['/marketplace_listing/stubbed/plans']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_PLANS_STUBBED = new InjectionToken<
  (
    params?:
      | AppsListPlansStubbedParams
      | (() => AppsListPlansStubbedParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListPlansStubbedResponse>>
>('APPS_LIST_PLANS_STUBBED');

export function provideAppsListPlansStubbed(): FactoryProvider {
  return {
    provide: APPS_LIST_PLANS_STUBBED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListPlansStubbedParams
          | (() => AppsListPlansStubbedParams | undefined),
      ) =>
        httpResource<AppsListPlansStubbedResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/marketplace_listing/stubbed/plans`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
