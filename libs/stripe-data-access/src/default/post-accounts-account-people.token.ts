import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsAccountPeopleBody = NonNullable<
  paths['/v1/accounts/{account}/people']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsAccountPeopleResponse =
  paths['/v1/accounts/{account}/people']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_PEOPLE = new InjectionToken<
  (
    account: string,
    body: PostAccountsAccountPeopleBody | Signal<PostAccountsAccountPeopleBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountPeopleResponse>>
>('POST_ACCOUNTS_ACCOUNT_PEOPLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      body:
        | PostAccountsAccountPeopleBody
        | Signal<PostAccountsAccountPeopleBody>,
    ) =>
      httpResource<PostAccountsAccountPeopleResponse>(() => ({
        url: `${base}/v1/accounts/${account}/people`,
        method: 'POST',
        body,
      }));
  },
});
