import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerBankAccountsIdBody = NonNullable<
  paths['/v1/customers/{customer}/bank_accounts/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerBankAccountsIdResponse =
  paths['/v1/customers/{customer}/bank_accounts/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | PostCustomersCustomerBankAccountsIdBody
      | Signal<PostCustomersCustomerBankAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerBankAccountsIdResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | PostCustomersCustomerBankAccountsIdBody
        | Signal<PostCustomersCustomerBankAccountsIdBody>,
    ) =>
      httpResource<PostCustomersCustomerBankAccountsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/bank_accounts/${id}`,
        method: 'POST',
        body,
      }));
  },
});
