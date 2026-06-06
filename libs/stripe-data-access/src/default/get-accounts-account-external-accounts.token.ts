import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountExternalAccountsParams =
  paths['/v1/accounts/{account}/external_accounts']['get']['parameters']['query'];

export type GetAccountsAccountExternalAccountsResponse =
  paths['/v1/accounts/{account}/external_accounts']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS = new InjectionToken<
  (
    account: string,
    params?:
      | GetAccountsAccountExternalAccountsParams
      | (() => GetAccountsAccountExternalAccountsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetAccountsAccountExternalAccountsResponse>
  >
>('GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS');

export function provideGetAccountsAccountExternalAccounts(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetAccountsAccountExternalAccountsParams
          | (() => GetAccountsAccountExternalAccountsParams | undefined),
      ) =>
        httpResource<GetAccountsAccountExternalAccountsResponse>(() => ({
          url: `${base}/v1/accounts/${account}/external_accounts`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
