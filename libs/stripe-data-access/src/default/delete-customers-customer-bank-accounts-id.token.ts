import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteCustomersCustomerBankAccountsIdBody = NonNullable<
  paths['/v1/customers/{customer}/bank_accounts/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteCustomersCustomerBankAccountsIdResponse =
  paths['/v1/customers/{customer}/bank_accounts/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | DeleteCustomersCustomerBankAccountsIdBody
      | Signal<DeleteCustomersCustomerBankAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<DeleteCustomersCustomerBankAccountsIdResponse>
  >
>('DELETE_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | DeleteCustomersCustomerBankAccountsIdBody
        | Signal<DeleteCustomersCustomerBankAccountsIdBody>,
    ) =>
      httpResource<DeleteCustomersCustomerBankAccountsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/bank_accounts/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
