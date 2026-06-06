import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerBankAccountsBody = NonNullable<
  paths['/v1/customers/{customer}/bank_accounts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerBankAccountsResponse =
  paths['/v1/customers/{customer}/bank_accounts']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerBankAccountsBody
      | Signal<PostCustomersCustomerBankAccountsBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerBankAccountsResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS');

export function providePostCustomersCustomerBankAccounts(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        body:
          | PostCustomersCustomerBankAccountsBody
          | Signal<PostCustomersCustomerBankAccountsBody>,
      ) =>
        httpResource<PostCustomersCustomerBankAccountsResponse>(() => ({
          url: `${base}/v1/customers/${customer}/bank_accounts`,
          method: 'POST',
          body,
        }));
    },
  };
}
