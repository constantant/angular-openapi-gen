import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingCreditBalanceTransactionsIdParams =
  paths['/v1/billing/credit_balance_transactions/{id}']['get']['parameters']['query'];

export type GetBillingCreditBalanceTransactionsIdResponse =
  paths['/v1/billing/credit_balance_transactions/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_TRANSACTIONS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetBillingCreditBalanceTransactionsIdParams
      | (() => GetBillingCreditBalanceTransactionsIdParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetBillingCreditBalanceTransactionsIdResponse>
  >
>('GET_BILLING_CREDIT_BALANCE_TRANSACTIONS_ID');

export function provideGetBillingCreditBalanceTransactionsId(): FactoryProvider {
  return {
    provide: GET_BILLING_CREDIT_BALANCE_TRANSACTIONS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetBillingCreditBalanceTransactionsIdParams
          | (() => GetBillingCreditBalanceTransactionsIdParams | undefined),
      ) =>
        httpResource<GetBillingCreditBalanceTransactionsIdResponse>(() => ({
          url: `${base}/v1/billing/credit_balance_transactions/${id}`,
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
