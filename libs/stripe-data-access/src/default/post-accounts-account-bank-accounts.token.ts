import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsAccountBankAccountsBody = NonNullable<
  paths['/v1/accounts/{account}/bank_accounts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsAccountBankAccountsResponse =
  paths['/v1/accounts/{account}/bank_accounts']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS = new InjectionToken<
  (
    account: string,
    body:
      | PostAccountsAccountBankAccountsBody
      | Signal<PostAccountsAccountBankAccountsBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountBankAccountsResponse>>
>('POST_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body:
        | PostAccountsAccountBankAccountsBody
        | Signal<PostAccountsAccountBankAccountsBody>,
    ) =>
      httpResource<PostAccountsAccountBankAccountsResponse>(() => ({
        url: `${base}/v1/accounts/${account}/bank_accounts`,
        method: 'POST',
        body,
      }));
  },
});
