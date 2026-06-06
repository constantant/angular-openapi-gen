import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostLinkedAccountsAccountDisconnectBody = NonNullable<
  paths['/v1/linked_accounts/{account}/disconnect']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostLinkedAccountsAccountDisconnectResponse =
  paths['/v1/linked_accounts/{account}/disconnect']['post']['responses']['200']['content']['application/json'];

export const POST_LINKED_ACCOUNTS_ACCOUNT_DISCONNECT = new InjectionToken<
  (
    account: string,
    body:
      | PostLinkedAccountsAccountDisconnectBody
      | Signal<PostLinkedAccountsAccountDisconnectBody>,
  ) => ReturnType<
    typeof httpResource<PostLinkedAccountsAccountDisconnectResponse>
  >
>('POST_LINKED_ACCOUNTS_ACCOUNT_DISCONNECT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body:
        | PostLinkedAccountsAccountDisconnectBody
        | Signal<PostLinkedAccountsAccountDisconnectBody>,
    ) =>
      httpResource<PostLinkedAccountsAccountDisconnectResponse>(() => ({
        url: `${base}/v1/linked_accounts/${account}/disconnect`,
        method: 'POST',
        body,
      }));
  },
});
