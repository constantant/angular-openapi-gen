import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountExternalAccountsBody = NonNullable<
  paths['/v1/accounts/{account}/external_accounts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountExternalAccountsResponse =
  paths['/v1/accounts/{account}/external_accounts']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS = new InjectionToken<
  (
    account: string,
    body:
      | PostAccountsAccountExternalAccountsBody
      | Signal<PostAccountsAccountExternalAccountsBody>,
  ) => ReturnType<
    typeof httpResource<PostAccountsAccountExternalAccountsResponse>
  >
>('POST_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS');

export function providePostAccountsAccountExternalAccounts(): FactoryProvider {
  return {
    provide: POST_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostAccountsAccountExternalAccountsBody
          | Signal<PostAccountsAccountExternalAccountsBody>,
      ) =>
        httpResource<PostAccountsAccountExternalAccountsResponse>(() => ({
          url: `${base}/v1/accounts/${account}/external_accounts`,
          method: 'POST',
          body,
        }));
    },
  };
}
