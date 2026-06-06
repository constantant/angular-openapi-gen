import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingCreditBalanceTransactionsIdParams =
  paths['/v1/billing/credit_balance_transactions/{id}']['get']['parameters']['query'];

type GetBillingCreditBalanceTransactionsIdResponse =
  paths['/v1/billing/credit_balance_transactions/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_BALANCE_TRANSACTIONS_ID = new InjectionToken<
  (
    id: string,
    params?: GetBillingCreditBalanceTransactionsIdParams,
  ) => ReturnType<
    typeof httpResource<GetBillingCreditBalanceTransactionsIdResponse>
  >
>('GET_BILLING_CREDIT_BALANCE_TRANSACTIONS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetBillingCreditBalanceTransactionsIdParams) =>
      httpResource<GetBillingCreditBalanceTransactionsIdResponse>(() => ({
        url: `${base}/v1/billing/credit_balance_transactions/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
