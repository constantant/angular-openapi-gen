import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetSubscriptionPlanForAccountStubbedResponse =
  paths['/marketplace_listing/stubbed/accounts/{account_id}']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED =
  new InjectionToken<
    (
      accountId: string,
    ) => ReturnType<
      typeof httpResource<AppsGetSubscriptionPlanForAccountStubbedResponse>
    >
  >('APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (accountId: string) =>
        httpResource<AppsGetSubscriptionPlanForAccountStubbedResponse>(() => ({
          url: `${base}/marketplace_listing/stubbed/accounts/${accountId}`,
        }));
    },
  });
