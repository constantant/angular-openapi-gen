import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerBalanceTransactionsTransactionBody =
  NonNullable<
    paths['/v1/customers/{customer}/balance_transactions/{transaction}']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerBalanceTransactionsTransactionResponse =
  paths['/v1/customers/{customer}/balance_transactions/{transaction}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS_TRANSACTION =
  new InjectionToken<
    (
      customer: string,
      transaction: string,
      body:
        | PostCustomersCustomerBalanceTransactionsTransactionBody
        | Signal<PostCustomersCustomerBalanceTransactionsTransactionBody>,
    ) => ReturnType<
      typeof httpResource<PostCustomersCustomerBalanceTransactionsTransactionResponse>
    >
  >('POST_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS_TRANSACTION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        transaction: string,
        body:
          | PostCustomersCustomerBalanceTransactionsTransactionBody
          | Signal<PostCustomersCustomerBalanceTransactionsTransactionBody>,
      ) =>
        httpResource<PostCustomersCustomerBalanceTransactionsTransactionResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/balance_transactions/${transaction}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
