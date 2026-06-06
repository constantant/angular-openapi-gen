import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountPersonsPersonParams =
  paths['/v1/accounts/{account}/persons/{person}']['get']['parameters']['query'];

export type GetAccountsAccountPersonsPersonResponse =
  paths['/v1/accounts/{account}/persons/{person}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_PERSONS_PERSON = new InjectionToken<
  (
    account: string,
    person: string,
    params?:
      | GetAccountsAccountPersonsPersonParams
      | (() => GetAccountsAccountPersonsPersonParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsAccountPersonsPersonResponse>>
>('GET_ACCOUNTS_ACCOUNT_PERSONS_PERSON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      person: string,
      params?:
        | GetAccountsAccountPersonsPersonParams
        | (() => GetAccountsAccountPersonsPersonParams | undefined),
    ) =>
      httpResource<GetAccountsAccountPersonsPersonResponse>(() => ({
        url: `${base}/v1/accounts/${account}/persons/${person}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
