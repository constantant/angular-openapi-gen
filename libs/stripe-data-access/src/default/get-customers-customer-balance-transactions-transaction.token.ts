import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerBalanceTransactionsTransactionParams =
  paths['/v1/customers/{customer}/balance_transactions/{transaction}']['get']['parameters']['query'];

type GetCustomersCustomerBalanceTransactionsTransactionResponse =
  paths['/v1/customers/{customer}/balance_transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS_TRANSACTION =
  new InjectionToken<
    (
      customer: string,
      transaction: string,
      params?: GetCustomersCustomerBalanceTransactionsTransactionParams,
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerBalanceTransactionsTransactionResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS_TRANSACTION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        transaction: string,
        params?: GetCustomersCustomerBalanceTransactionsTransactionParams,
      ) =>
        httpResource<GetCustomersCustomerBalanceTransactionsTransactionResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/balance_transactions/${transaction}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
