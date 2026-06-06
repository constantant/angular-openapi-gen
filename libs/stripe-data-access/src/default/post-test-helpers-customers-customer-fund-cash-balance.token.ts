import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersCustomersCustomerFundCashBalanceBody = NonNullable<
  paths['/v1/test_helpers/customers/{customer}/fund_cash_balance']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersCustomersCustomerFundCashBalanceResponse =
  paths['/v1/test_helpers/customers/{customer}/fund_cash_balance']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_CUSTOMERS_CUSTOMER_FUND_CASH_BALANCE =
  new InjectionToken<
    (
      customer: string,
      body:
        | PostTestHelpersCustomersCustomerFundCashBalanceBody
        | Signal<PostTestHelpersCustomersCustomerFundCashBalanceBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersCustomersCustomerFundCashBalanceResponse>
    >
  >('POST_TEST_HELPERS_CUSTOMERS_CUSTOMER_FUND_CASH_BALANCE');

export function providePostTestHelpersCustomersCustomerFundCashBalance(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_CUSTOMERS_CUSTOMER_FUND_CASH_BALANCE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        body:
          | PostTestHelpersCustomersCustomerFundCashBalanceBody
          | Signal<PostTestHelpersCustomersCustomerFundCashBalanceBody>,
      ) =>
        httpResource<PostTestHelpersCustomersCustomerFundCashBalanceResponse>(
          () => ({
            url: `${base}/v1/test_helpers/customers/${customer}/fund_cash_balance`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
