import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxTransactionsTransactionParams =
  paths['/v1/tax/transactions/{transaction}']['get']['parameters']['query'];

export type GetTaxTransactionsTransactionResponse =
  paths['/v1/tax/transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_TRANSACTIONS_TRANSACTION = new InjectionToken<
  (
    transaction: string,
    params?:
      | GetTaxTransactionsTransactionParams
      | (() => GetTaxTransactionsTransactionParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxTransactionsTransactionResponse>>
>('GET_TAX_TRANSACTIONS_TRANSACTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      transaction: string,
      params?:
        | GetTaxTransactionsTransactionParams
        | (() => GetTaxTransactionsTransactionParams | undefined),
    ) =>
      httpResource<GetTaxTransactionsTransactionResponse>(() => ({
        url: `${base}/v1/tax/transactions/${transaction}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
