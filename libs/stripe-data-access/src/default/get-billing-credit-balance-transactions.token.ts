import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingCreditBalanceTransactionsParams =
  paths['/v1/billing/credit_balance_transactions']['get']['parameters']['query'];

type GetBillingCreditBalanceTransactionsResponse =
  paths['/v1/billing/credit_balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    params?: GetBillingCreditBalanceTransactionsParams,
  ) => ReturnType<
    typeof httpResource<GetBillingCreditBalanceTransactionsResponse>
  >
>('GET_BILLING_CREDIT_BALANCE_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBillingCreditBalanceTransactionsParams) =>
      httpResource<GetBillingCreditBalanceTransactionsResponse>(() => ({
        url: `${base}/v1/billing/credit_balance_transactions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
