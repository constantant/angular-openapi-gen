import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerCashBalanceTransactionsTransactionParams =
  paths['/v1/customers/{customer}/cash_balance_transactions/{transaction}']['get']['parameters']['query'];

export type GetCustomersCustomerCashBalanceTransactionsTransactionResponse =
  paths['/v1/customers/{customer}/cash_balance_transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_CASH_BALANCE_TRANSACTIONS_TRANSACTION =
  new InjectionToken<
    (
      customer: string,
      transaction: string,
      params?:
        | GetCustomersCustomerCashBalanceTransactionsTransactionParams
        | (() =>
            | GetCustomersCustomerCashBalanceTransactionsTransactionParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerCashBalanceTransactionsTransactionResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_CASH_BALANCE_TRANSACTIONS_TRANSACTION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        transaction: string,
        params?:
          | GetCustomersCustomerCashBalanceTransactionsTransactionParams
          | (() =>
              | GetCustomersCustomerCashBalanceTransactionsTransactionParams
              | undefined),
      ) =>
        httpResource<GetCustomersCustomerCashBalanceTransactionsTransactionResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/cash_balance_transactions/${transaction}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
