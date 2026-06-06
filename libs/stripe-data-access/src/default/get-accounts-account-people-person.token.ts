import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetAccountsAccountPeoplePersonParams =
  paths['/v1/accounts/{account}/people/{person}']['get']['parameters']['query'];

type GetAccountsAccountPeoplePersonResponse =
  paths['/v1/accounts/{account}/people/{person}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_PEOPLE_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    params?: GetAccountsAccountPeoplePersonParams,
  ) => ReturnType<typeof httpResource<GetAccountsAccountPeoplePersonResponse>>
>('GET_ACCOUNTS_ACCOUNT_PEOPLE_PERSON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      person: string,
      params?: GetAccountsAccountPeoplePersonParams,
    ) =>
      httpResource<GetAccountsAccountPeoplePersonResponse>(() => ({
        url: `${base}/v1/accounts/${account}/people/${person}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
