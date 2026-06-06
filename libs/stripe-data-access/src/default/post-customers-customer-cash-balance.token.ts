import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerCashBalanceBody = NonNullable<
  paths['/v1/customers/{customer}/cash_balance']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerCashBalanceResponse =
  paths['/v1/customers/{customer}/cash_balance']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_CASH_BALANCE = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerCashBalanceBody
      | Signal<PostCustomersCustomerCashBalanceBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerCashBalanceResponse>>
>('POST_CUSTOMERS_CUSTOMER_CASH_BALANCE');

export function providePostCustomersCustomerCashBalance(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_CASH_BALANCE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        body:
          | PostCustomersCustomerCashBalanceBody
          | Signal<PostCustomersCustomerCashBalanceBody>,
      ) =>
        httpResource<PostCustomersCustomerCashBalanceResponse>(() => ({
          url: `${base}/v1/customers/${customer}/cash_balance`,
          method: 'POST',
          body,
        }));
    },
  };
}
