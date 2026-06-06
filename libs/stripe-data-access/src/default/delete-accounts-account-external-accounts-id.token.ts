import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteAccountsAccountExternalAccountsIdBody = NonNullable<
  paths['/v1/accounts/{account}/external_accounts/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteAccountsAccountExternalAccountsIdResponse =
  paths['/v1/accounts/{account}/external_accounts/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    body:
      | DeleteAccountsAccountExternalAccountsIdBody
      | Signal<DeleteAccountsAccountExternalAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<DeleteAccountsAccountExternalAccountsIdResponse>
  >
>('DELETE_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      id: string,
      body:
        | DeleteAccountsAccountExternalAccountsIdBody
        | Signal<DeleteAccountsAccountExternalAccountsIdBody>,
    ) =>
      httpResource<DeleteAccountsAccountExternalAccountsIdResponse>(() => ({
        url: `${base}/v1/accounts/${account}/external_accounts/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
