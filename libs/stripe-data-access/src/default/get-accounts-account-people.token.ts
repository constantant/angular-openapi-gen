import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetAccountsAccountPeopleParams =
  paths['/v1/accounts/{account}/people']['get']['parameters']['query'];

type GetAccountsAccountPeopleResponse =
  paths['/v1/accounts/{account}/people']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_PEOPLE = new InjectionToken<
  (
    account: string,
    params?: GetAccountsAccountPeopleParams,
  ) => ReturnType<typeof httpResource<GetAccountsAccountPeopleResponse>>
>('GET_ACCOUNTS_ACCOUNT_PEOPLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (account: string, params?: GetAccountsAccountPeopleParams) =>
      httpResource<GetAccountsAccountPeopleResponse>(() => ({
        url: `${base}/v1/accounts/${account}/people`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
