import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteAccountsAccountPersonsPersonBody = NonNullable<
  paths['/v1/accounts/{account}/persons/{person}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteAccountsAccountPersonsPersonResponse =
  paths['/v1/accounts/{account}/persons/{person}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ACCOUNTS_ACCOUNT_PERSONS_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    body:
      | DeleteAccountsAccountPersonsPersonBody
      | Signal<DeleteAccountsAccountPersonsPersonBody>,
  ) => ReturnType<
    typeof httpResource<DeleteAccountsAccountPersonsPersonResponse>
  >
>('DELETE_ACCOUNTS_ACCOUNT_PERSONS_PERSON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      person: string,
      body:
        | DeleteAccountsAccountPersonsPersonBody
        | Signal<DeleteAccountsAccountPersonsPersonBody>,
    ) =>
      httpResource<DeleteAccountsAccountPersonsPersonResponse>(() => ({
        url: `${base}/v1/accounts/${account}/persons/${person}`,
        method: 'DELETE',
        body,
      }));
  },
});
