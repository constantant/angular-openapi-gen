import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountPeoplePersonBody = NonNullable<
  paths['/v1/accounts/{account}/people/{person}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountPeoplePersonResponse =
  paths['/v1/accounts/{account}/people/{person}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_PEOPLE_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    body:
      | PostAccountsAccountPeoplePersonBody
      | Signal<PostAccountsAccountPeoplePersonBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountPeoplePersonResponse>>
>('POST_ACCOUNTS_ACCOUNT_PEOPLE_PERSON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      person: string,
      body:
        | PostAccountsAccountPeoplePersonBody
        | Signal<PostAccountsAccountPeoplePersonBody>,
    ) =>
      httpResource<PostAccountsAccountPeoplePersonResponse>(() => ({
        url: `${base}/v1/accounts/${account}/people/${person}`,
        method: 'POST',
        body,
      }));
  },
});
