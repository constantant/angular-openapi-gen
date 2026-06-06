import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingCreditBalanceTransactionsParams =
  paths['/v1/billing/credit_balance_transactions']['get']['parameters']['query'];

export type GetBillingCreditBalanceTransactionsResponse =
  paths['/v1/billing/credit_balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    params?:
      | GetBillingCreditBalanceTransactionsParams
      | (() => GetBillingCreditBalanceTransactionsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetBillingCreditBalanceTransactionsResponse>
  >
>('GET_BILLING_CREDIT_BALANCE_TRANSACTIONS');

export function provideGetBillingCreditBalanceTransactions(): FactoryProvider {
  return {
    provide: GET_BILLING_CREDIT_BALANCE_TRANSACTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBillingCreditBalanceTransactionsParams
          | (() => GetBillingCreditBalanceTransactionsParams | undefined),
      ) =>
        httpResource<GetBillingCreditBalanceTransactionsResponse>(() => ({
          url: `${base}/v1/billing/credit_balance_transactions`,
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
