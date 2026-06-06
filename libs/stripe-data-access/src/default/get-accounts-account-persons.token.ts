import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetAccountsAccountPersonsParams =
  paths['/v1/accounts/{account}/persons']['get']['parameters']['query'];

type GetAccountsAccountPersonsResponse =
  paths['/v1/accounts/{account}/persons']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_PERSONS = new InjectionToken<
  (
    account: string,
    params?: GetAccountsAccountPersonsParams,
  ) => ReturnType<typeof httpResource<GetAccountsAccountPersonsResponse>>
>('GET_ACCOUNTS_ACCOUNT_PERSONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (account: string, params?: GetAccountsAccountPersonsParams) =>
      httpResource<GetAccountsAccountPersonsResponse>(() => ({
        url: `${base}/v1/accounts/${account}/persons`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
