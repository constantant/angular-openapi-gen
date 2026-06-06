import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerBalanceTransactionsParams =
  paths['/v1/customers/{customer}/balance_transactions']['get']['parameters']['query'];

export type GetCustomersCustomerBalanceTransactionsResponse =
  paths['/v1/customers/{customer}/balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    customer: string,
    params?:
      | GetCustomersCustomerBalanceTransactionsParams
      | (() => GetCustomersCustomerBalanceTransactionsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetCustomersCustomerBalanceTransactionsResponse>
  >
>('GET_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      params?:
        | GetCustomersCustomerBalanceTransactionsParams
        | (() => GetCustomersCustomerBalanceTransactionsParams | undefined),
    ) =>
      httpResource<GetCustomersCustomerBalanceTransactionsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/balance_transactions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
