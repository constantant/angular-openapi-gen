import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFinancialConnectionsTransactionsTransactionParams =
  paths['/v1/financial_connections/transactions/{transaction}']['get']['parameters']['query'];

export type GetFinancialConnectionsTransactionsTransactionResponse =
  paths['/v1/financial_connections/transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_TRANSACTIONS_TRANSACTION =
  new InjectionToken<
    (
      transaction: string,
      params?:
        | GetFinancialConnectionsTransactionsTransactionParams
        | (() =>
            | GetFinancialConnectionsTransactionsTransactionParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetFinancialConnectionsTransactionsTransactionResponse>
    >
  >('GET_FINANCIAL_CONNECTIONS_TRANSACTIONS_TRANSACTION');

export function provideGetFinancialConnectionsTransactionsTransaction(): FactoryProvider {
  return {
    provide: GET_FINANCIAL_CONNECTIONS_TRANSACTIONS_TRANSACTION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        transaction: string,
        params?:
          | GetFinancialConnectionsTransactionsTransactionParams
          | (() =>
              | GetFinancialConnectionsTransactionsTransactionParams
              | undefined),
      ) =>
        httpResource<GetFinancialConnectionsTransactionsTransactionResponse>(
          () => ({
            url: `${base}/v1/financial_connections/transactions/${transaction}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
