import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsParams =
  paths['/v1/accounts']['get']['parameters']['query'];

export type GetAccountsResponse =
  paths['/v1/accounts']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS = new InjectionToken<
  (
    params?: GetAccountsParams | (() => GetAccountsParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsResponse>>
>('GET_ACCOUNTS');

export function provideGetAccounts(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetAccountsParams | (() => GetAccountsParams | undefined),
      ) =>
        httpResource<GetAccountsResponse>(() => ({
          url: `${base}/v1/accounts`,
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
