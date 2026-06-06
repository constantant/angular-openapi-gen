import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetAccountsAccountExternalAccountsParams =
  paths['/v1/accounts/{account}/external_accounts']['get']['parameters']['query'];

type GetAccountsAccountExternalAccountsResponse =
  paths['/v1/accounts/{account}/external_accounts']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS = new InjectionToken<
  (
    account: string,
    params?: GetAccountsAccountExternalAccountsParams,
  ) => ReturnType<
    typeof httpResource<GetAccountsAccountExternalAccountsResponse>
  >
>('GET_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      params?: GetAccountsAccountExternalAccountsParams,
    ) =>
      httpResource<GetAccountsAccountExternalAccountsResponse>(() => ({
        url: `${base}/v1/accounts/${account}/external_accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
