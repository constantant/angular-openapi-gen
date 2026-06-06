import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteAccountsAccountBankAccountsIdBody = NonNullable<
  paths['/v1/accounts/{account}/bank_accounts/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteAccountsAccountBankAccountsIdResponse =
  paths['/v1/accounts/{account}/bank_accounts/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    body:
      | DeleteAccountsAccountBankAccountsIdBody
      | Signal<DeleteAccountsAccountBankAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<DeleteAccountsAccountBankAccountsIdResponse>
  >
>('DELETE_ACCOUNTS_ACCOUNT_BANK_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      id: string,
      body:
        | DeleteAccountsAccountBankAccountsIdBody
        | Signal<DeleteAccountsAccountBankAccountsIdBody>,
    ) =>
      httpResource<DeleteAccountsAccountBankAccountsIdResponse>(() => ({
        url: `${base}/v1/accounts/${account}/bank_accounts/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
