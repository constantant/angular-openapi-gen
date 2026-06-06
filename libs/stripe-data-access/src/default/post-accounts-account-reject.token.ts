import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountRejectBody = NonNullable<
  paths['/v1/accounts/{account}/reject']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountRejectResponse =
  paths['/v1/accounts/{account}/reject']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_REJECT = new InjectionToken<
  (
    account: string,
    body: PostAccountsAccountRejectBody | Signal<PostAccountsAccountRejectBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountRejectResponse>>
>('POST_ACCOUNTS_ACCOUNT_REJECT');

export function providePostAccountsAccountReject(): FactoryProvider {
  return {
    provide: POST_ACCOUNTS_ACCOUNT_REJECT,
    useFactory: () => {
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
  };
}
