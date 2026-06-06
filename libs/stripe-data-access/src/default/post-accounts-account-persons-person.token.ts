import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountPersonsPersonBody = NonNullable<
  paths['/v1/accounts/{account}/persons/{person}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountPersonsPersonResponse =
  paths['/v1/accounts/{account}/persons/{person}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_PERSONS_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    body:
      | PostAccountsAccountPersonsPersonBody
      | Signal<PostAccountsAccountPersonsPersonBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountPersonsPersonResponse>>
>('POST_ACCOUNTS_ACCOUNT_PERSONS_PERSON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      person: string,
      body:
        | PostAccountsAccountPersonsPersonBody
        | Signal<PostAccountsAccountPersonsPersonBody>,
    ) =>
      httpResource<PostAccountsAccountPersonsPersonResponse>(() => ({
        url: `${base}/v1/accounts/${account}/persons/${person}`,
        method: 'POST',
        body,
      }));
  },
});
