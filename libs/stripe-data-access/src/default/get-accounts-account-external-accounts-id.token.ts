import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountExternalAccountsIdParams =
  paths['/v1/accounts/{account}/external_accounts/{id}']['get']['parameters']['query'];

export type GetAccountsAccountExternalAccountsIdResponse =
  paths['/v1/accounts/{account}/external_accounts/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    params?:
      | GetAccountsAccountExternalAccountsIdParams
      | (() => GetAccountsAccountExternalAccountsIdParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetAccountsAccountExternalAccountsIdResponse>
  >
>('GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID');

export function provideGetAccountsAccountExternalAccountsId(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        id: string,
        params?:
          | GetAccountsAccountExternalAccountsIdParams
          | (() => GetAccountsAccountExternalAccountsIdParams | undefined),
      ) =>
        httpResource<GetAccountsAccountExternalAccountsIdResponse>(() => ({
          url: `${base}/v1/accounts/${account}/external_accounts/${id}`,
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
