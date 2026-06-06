import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountParams =
  paths['/v1/accounts/{account}']['get']['parameters']['query'];

export type GetAccountsAccountResponse =
  paths['/v1/accounts/{account}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    params?:
      | GetAccountsAccountParams
      | (() => GetAccountsAccountParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsAccountResponse>>
>('GET_ACCOUNTS_ACCOUNT');

export function provideGetAccountsAccount(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetAccountsAccountParams
          | (() => GetAccountsAccountParams | undefined),
      ) =>
        httpResource<GetAccountsAccountResponse>(() => ({
          url: `${base}/v1/accounts/${account}`,
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
