import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerBalanceTransactionsBody = NonNullable<
  paths['/v1/customers/{customer}/balance_transactions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerBalanceTransactionsResponse =
  paths['/v1/customers/{customer}/balance_transactions']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerBalanceTransactionsBody
      | Signal<PostCustomersCustomerBalanceTransactionsBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerBalanceTransactionsResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_BALANCE_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body:
        | PostCustomersCustomerBalanceTransactionsBody
        | Signal<PostCustomersCustomerBalanceTransactionsBody>,
    ) =>
      httpResource<PostCustomersCustomerBalanceTransactionsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/balance_transactions`,
        method: 'POST',
        body,
      }));
  },
});
