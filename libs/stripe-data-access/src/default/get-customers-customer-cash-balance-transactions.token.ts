import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerCashBalanceTransactionsParams =
  paths['/v1/customers/{customer}/cash_balance_transactions']['get']['parameters']['query'];

type GetCustomersCustomerCashBalanceTransactionsResponse =
  paths['/v1/customers/{customer}/cash_balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_CASH_BALANCE_TRANSACTIONS =
  new InjectionToken<
    (
      customer: string,
      params?: GetCustomersCustomerCashBalanceTransactionsParams,
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerCashBalanceTransactionsResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_CASH_BALANCE_TRANSACTIONS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        params?: GetCustomersCustomerCashBalanceTransactionsParams,
      ) =>
        httpResource<GetCustomersCustomerCashBalanceTransactionsResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/cash_balance_transactions`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
