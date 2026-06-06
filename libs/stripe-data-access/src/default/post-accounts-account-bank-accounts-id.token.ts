import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsAccountBankAccountsIdBody = NonNullable<
  paths['/v1/accounts/{account}/bank_accounts/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsAccountBankAccountsIdResponse =
  paths['/v1/accounts/{account}/bank_accounts/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    body:
      | PostAccountsAccountBankAccountsIdBody
      | Signal<PostAccountsAccountBankAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<PostAccountsAccountBankAccountsIdResponse>
  >
>('POST_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      id: string,
      body:
        | PostAccountsAccountBankAccountsIdBody
        | Signal<PostAccountsAccountBankAccountsIdBody>,
    ) =>
      httpResource<PostAccountsAccountBankAccountsIdResponse>(() => ({
        url: `${base}/v1/accounts/${account}/bank_accounts/${id}`,
        method: 'POST',
        body,
      }));
  },
});
