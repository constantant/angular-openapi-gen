import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListAccountsForPlanParams =
  paths['/marketplace_listing/plans/{plan_id}/accounts']['get']['parameters']['query'];

export type AppsListAccountsForPlanResponse =
  paths['/marketplace_listing/plans/{plan_id}/accounts']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_ACCOUNTS_FOR_PLAN = new InjectionToken<
  (
    planId: string,
    params?:
      | AppsListAccountsForPlanParams
      | (() => AppsListAccountsForPlanParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListAccountsForPlanResponse>>
>('APPS_LIST_ACCOUNTS_FOR_PLAN');

export function provideAppsListAccountsForPlan(): FactoryProvider {
  return {
    provide: APPS_LIST_ACCOUNTS_FOR_PLAN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        planId: string,
        params?:
          | AppsListAccountsForPlanParams
          | (() => AppsListAccountsForPlanParams | undefined),
      ) =>
        httpResource<AppsListAccountsForPlanResponse>(() => ({
          url: `${base}/marketplace_listing/plans/${planId}/accounts`,
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
