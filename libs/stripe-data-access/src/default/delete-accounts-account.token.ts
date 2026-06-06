import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteAccountsAccountBody = NonNullable<
  paths['/v1/accounts/{account}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteAccountsAccountResponse =
  paths['/v1/accounts/{account}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    body: DeleteAccountsAccountBody | Signal<DeleteAccountsAccountBody>,
  ) => ReturnType<typeof httpResource<DeleteAccountsAccountResponse>>
>('DELETE_ACCOUNTS_ACCOUNT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body: DeleteAccountsAccountBody | Signal<DeleteAccountsAccountBody>,
    ) =>
      httpResource<DeleteAccountsAccountResponse>(() => ({
        url: `${base}/v1/accounts/${account}`,
        method: 'DELETE',
        body,
      }));
  },
});
