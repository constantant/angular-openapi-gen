import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingCreditBalanceSummaryParams =
  paths['/v1/billing/credit_balance_summary']['get']['parameters']['query'];

export type GetBillingCreditBalanceSummaryResponse =
  paths['/v1/billing/credit_balance_summary']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_SUMMARY = new InjectionToken<
  (
    params?:
      | GetBillingCreditBalanceSummaryParams
      | (() => GetBillingCreditBalanceSummaryParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingCreditBalanceSummaryResponse>>
>('GET_BILLING_CREDIT_BALANCE_SUMMARY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetBillingCreditBalanceSummaryParams
        | (() => GetBillingCreditBalanceSummaryParams | undefined),
    ) =>
      httpResource<GetBillingCreditBalanceSummaryResponse>(() => ({
        url: `${base}/v1/billing/credit_balance_summary`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
