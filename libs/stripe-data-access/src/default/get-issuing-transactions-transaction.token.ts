import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingTransactionsTransactionParams =
  paths['/v1/issuing/transactions/{transaction}']['get']['parameters']['query'];

export type GetIssuingTransactionsTransactionResponse =
  paths['/v1/issuing/transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_TRANSACTIONS_TRANSACTION = new InjectionToken<
  (
    transaction: string,
    params?:
      | GetIssuingTransactionsTransactionParams
      | (() => GetIssuingTransactionsTransactionParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetIssuingTransactionsTransactionResponse>
  >
>('GET_ISSUING_TRANSACTIONS_TRANSACTION');

export function provideGetIssuingTransactionsTransaction(): FactoryProvider {
  return {
    provide: GET_ISSUING_TRANSACTIONS_TRANSACTION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        transaction: string,
        params?:
          | GetIssuingTransactionsTransactionParams
          | (() => GetIssuingTransactionsTransactionParams | undefined),
      ) =>
        httpResource<GetIssuingTransactionsTransactionResponse>(() => ({
          url: `${base}/v1/issuing/transactions/${transaction}`,
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
