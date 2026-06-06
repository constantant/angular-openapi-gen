import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostLinkedAccountsAccountRefreshBody = NonNullable<
  paths['/v1/linked_accounts/{account}/refresh']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostLinkedAccountsAccountRefreshResponse =
  paths['/v1/linked_accounts/{account}/refresh']['post']['responses']['200']['content']['application/json'];

export const POST_LINKED_ACCOUNTS_ACCOUNT_REFRESH = new InjectionToken<
  (
    account: string,
    body:
      | PostLinkedAccountsAccountRefreshBody
      | Signal<PostLinkedAccountsAccountRefreshBody>,
  ) => ReturnType<typeof httpResource<PostLinkedAccountsAccountRefreshResponse>>
>('POST_LINKED_ACCOUNTS_ACCOUNT_REFRESH');

export function providePostLinkedAccountsAccountRefresh(): FactoryProvider {
  return {
    provide: POST_LINKED_ACCOUNTS_ACCOUNT_REFRESH,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostLinkedAccountsAccountRefreshBody
          | Signal<PostLinkedAccountsAccountRefreshBody>,
      ) =>
        httpResource<PostLinkedAccountsAccountRefreshResponse>(() => ({
          url: `${base}/v1/linked_accounts/${account}/refresh`,
          method: 'POST',
          body,
        }));
    },
  };
}
