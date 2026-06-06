import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountBankAccountsIdParams =
  paths['/v1/accounts/{account}/bank_accounts/{id}']['get']['parameters']['query'];

export type GetAccountsAccountBankAccountsIdResponse =
  paths['/v1/accounts/{account}/bank_accounts/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    params?:
      | GetAccountsAccountBankAccountsIdParams
      | (() => GetAccountsAccountBankAccountsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsAccountBankAccountsIdResponse>>
>('GET_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      id: string,
      params?:
        | GetAccountsAccountBankAccountsIdParams
        | (() => GetAccountsAccountBankAccountsIdParams | undefined),
    ) =>
      httpResource<GetAccountsAccountBankAccountsIdResponse>(() => ({
        url: `${base}/v1/accounts/${account}/bank_accounts/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
