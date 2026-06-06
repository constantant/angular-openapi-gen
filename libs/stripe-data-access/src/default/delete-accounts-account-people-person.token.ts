import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteAccountsAccountPeoplePersonBody = NonNullable<
  paths['/v1/accounts/{account}/people/{person}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteAccountsAccountPeoplePersonResponse =
  paths['/v1/accounts/{account}/people/{person}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ACCOUNTS_ACCOUNT_PEOPLE_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    body:
      | DeleteAccountsAccountPeoplePersonBody
      | Signal<DeleteAccountsAccountPeoplePersonBody>,
  ) => ReturnType<
    typeof httpResource<DeleteAccountsAccountPeoplePersonResponse>
  >
>('DELETE_ACCOUNTS_ACCOUNT_PEOPLE_PERSON');

export function provideDeleteAccountsAccountPeoplePerson(): FactoryProvider {
  return {
    provide: DELETE_ACCOUNTS_ACCOUNT_PEOPLE_PERSON,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        person: string,
        body:
          | DeleteAccountsAccountPeoplePersonBody
          | Signal<DeleteAccountsAccountPeoplePersonBody>,
      ) =>
        httpResource<DeleteAccountsAccountPeoplePersonResponse>(() => ({
          url: `${base}/v1/accounts/${account}/people/${person}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
