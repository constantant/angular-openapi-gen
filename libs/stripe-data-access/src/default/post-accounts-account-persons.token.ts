import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountPersonsBody = NonNullable<
  paths['/v1/accounts/{account}/persons']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountPersonsResponse =
  paths['/v1/accounts/{account}/persons']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_PERSONS = new InjectionToken<
  (
    account: string,
    body:
      | PostAccountsAccountPersonsBody
      | Signal<PostAccountsAccountPersonsBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountPersonsResponse>>
>('POST_ACCOUNTS_ACCOUNT_PERSONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body:
        | PostAccountsAccountPersonsBody
        | Signal<PostAccountsAccountPersonsBody>,
    ) =>
      httpResource<PostAccountsAccountPersonsResponse>(() => ({
        url: `${base}/v1/accounts/${account}/persons`,
        method: 'POST',
        body,
      }));
  },
});
