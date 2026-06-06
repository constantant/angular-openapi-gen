import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerBankAccountsIdVerifyBody = NonNullable<
  paths['/v1/customers/{customer}/bank_accounts/{id}/verify']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerBankAccountsIdVerifyResponse =
  paths['/v1/customers/{customer}/bank_accounts/{id}/verify']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID_VERIFY =
  new InjectionToken<
    (
      customer: string,
      id: string,
      body:
        | PostCustomersCustomerBankAccountsIdVerifyBody
        | Signal<PostCustomersCustomerBankAccountsIdVerifyBody>,
    ) => ReturnType<
      typeof httpResource<PostCustomersCustomerBankAccountsIdVerifyResponse>
    >
  >('POST_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID_VERIFY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        id: string,
        body:
          | PostCustomersCustomerBankAccountsIdVerifyBody
          | Signal<PostCustomersCustomerBankAccountsIdVerifyBody>,
      ) =>
        httpResource<PostCustomersCustomerBankAccountsIdVerifyResponse>(() => ({
          url: `${base}/v1/customers/${customer}/bank_accounts/${id}/verify`,
          method: 'POST',
          body,
        }));
    },
  });
