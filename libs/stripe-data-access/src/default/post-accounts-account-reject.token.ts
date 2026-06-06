import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsAccountRejectBody = NonNullable<
  paths['/v1/accounts/{account}/reject']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsAccountRejectResponse =
  paths['/v1/accounts/{account}/reject']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_REJECT = new InjectionToken<
  (
    account: string,
    body: PostAccountsAccountRejectBody | Signal<PostAccountsAccountRejectBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountRejectResponse>>
>('POST_ACCOUNTS_ACCOUNT_REJECT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body:
        | PostAccountsAccountRejectBody
        | Signal<PostAccountsAccountRejectBody>,
    ) =>
      httpResource<PostAccountsAccountRejectResponse>(() => ({
        url: `${base}/v1/accounts/${account}/reject`,
        method: 'POST',
        body,
      }));
  },
});
