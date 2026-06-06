import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerBankAccountsParams =
  paths['/v1/customers/{customer}/bank_accounts']['get']['parameters']['query'];

type GetCustomersCustomerBankAccountsResponse =
  paths['/v1/customers/{customer}/bank_accounts']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerBankAccountsParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerBankAccountsResponse>>
>('GET_CUSTOMERS_CUSTOMER_BANK_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      params?: GetCustomersCustomerBankAccountsParams,
    ) =>
      httpResource<GetCustomersCustomerBankAccountsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/bank_accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
