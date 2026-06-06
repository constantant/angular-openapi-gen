import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListAccountsForPlanStubbedParams =
  paths['/marketplace_listing/stubbed/plans/{plan_id}/accounts']['get']['parameters']['query'];

export type AppsListAccountsForPlanStubbedResponse =
  paths['/marketplace_listing/stubbed/plans/{plan_id}/accounts']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED = new InjectionToken<
  (
    planId: string,
    params?:
      | AppsListAccountsForPlanStubbedParams
      | (() => AppsListAccountsForPlanStubbedParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListAccountsForPlanStubbedResponse>>
>('APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED');

export function provideAppsListAccountsForPlanStubbed(): FactoryProvider {
  return {
    provide: APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        planId: string,
        params?:
          | AppsListAccountsForPlanStubbedParams
          | (() => AppsListAccountsForPlanStubbedParams | undefined),
      ) =>
        httpResource<AppsListAccountsForPlanStubbedResponse>(() => ({
          url: `${base}/marketplace_listing/stubbed/plans/${planId}/accounts`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
