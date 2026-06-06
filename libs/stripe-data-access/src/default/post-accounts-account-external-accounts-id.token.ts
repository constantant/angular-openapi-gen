import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountExternalAccountsIdBody = NonNullable<
  paths['/v1/accounts/{account}/external_accounts/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountExternalAccountsIdResponse =
  paths['/v1/accounts/{account}/external_accounts/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID = new InjectionToken<
  (
    account: string,
    id: string,
    body:
      | PostAccountsAccountExternalAccountsIdBody
      | Signal<PostAccountsAccountExternalAccountsIdBody>,
  ) => ReturnType<
    typeof httpResource<PostAccountsAccountExternalAccountsIdResponse>
  >
>('POST_ACCOUNTS_ACCOUNT_EXTERNAL_ACCOUNTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      id: string,
      body:
        | PostAccountsAccountExternalAccountsIdBody
        | Signal<PostAccountsAccountExternalAccountsIdBody>,
    ) =>
      httpResource<PostAccountsAccountExternalAccountsIdResponse>(() => ({
        url: `${base}/v1/accounts/${account}/external_accounts/${id}`,
        method: 'POST',
        body,
      }));
  },
});
