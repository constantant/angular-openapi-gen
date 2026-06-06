import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingCreditBalanceSummaryParams =
  paths['/v1/billing/credit_balance_summary']['get']['parameters']['query'];

type GetBillingCreditBalanceSummaryResponse =
  paths['/v1/billing/credit_balance_summary']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_SUMMARY = new InjectionToken<
  (
    params?: GetBillingCreditBalanceSummaryParams,
  ) => ReturnType<typeof httpResource<GetBillingCreditBalanceSummaryResponse>>
>('GET_BILLING_CREDIT_BALANCE_SUMMARY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBillingCreditBalanceSummaryParams) =>
      httpResource<GetBillingCreditBalanceSummaryResponse>(() => ({
        url: `${base}/v1/billing/credit_balance_summary`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
