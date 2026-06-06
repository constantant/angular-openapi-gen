import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountPeoplePersonParams =
  paths['/v1/accounts/{account}/people/{person}']['get']['parameters']['query'];

export type GetAccountsAccountPeoplePersonResponse =
  paths['/v1/accounts/{account}/people/{person}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_PEOPLE_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    params?:
      | GetAccountsAccountPeoplePersonParams
      | (() => GetAccountsAccountPeoplePersonParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsAccountPeoplePersonResponse>>
>('GET_ACCOUNTS_ACCOUNT_PEOPLE_PERSON');

export function provideGetAccountsAccountPeoplePerson(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT_PEOPLE_PERSON,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        person: string,
        params?:
          | GetAccountsAccountPeoplePersonParams
          | (() => GetAccountsAccountPeoplePersonParams | undefined),
      ) =>
        httpResource<GetAccountsAccountPeoplePersonResponse>(() => ({
          url: `${base}/v1/accounts/${account}/people/${person}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
