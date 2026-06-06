import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerBankAccountsIdParams =
  paths['/v1/customers/{customer}/bank_accounts/{id}']['get']['parameters']['query'];

export type GetCustomersCustomerBankAccountsIdResponse =
  paths['/v1/customers/{customer}/bank_accounts/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?:
      | GetCustomersCustomerBankAccountsIdParams
      | (() => GetCustomersCustomerBankAccountsIdParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetCustomersCustomerBankAccountsIdResponse>
  >
>('GET_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      params?:
        | GetCustomersCustomerBankAccountsIdParams
        | (() => GetCustomersCustomerBankAccountsIdParams | undefined),
    ) =>
      httpResource<GetCustomersCustomerBankAccountsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/bank_accounts/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
