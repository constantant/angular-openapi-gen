import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsAccountBody = NonNullable<
  paths['/v1/accounts/{account}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsAccountResponse =
  paths['/v1/accounts/{account}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    body: PostAccountsAccountBody | Signal<PostAccountsAccountBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountResponse>>
>('POST_ACCOUNTS_ACCOUNT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body: PostAccountsAccountBody | Signal<PostAccountsAccountBody>,
    ) =>
      httpResource<PostAccountsAccountResponse>(() => ({
        url: `${base}/v1/accounts/${account}`,
        method: 'POST',
        body,
      }));
  },
});
