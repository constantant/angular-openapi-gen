import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountCapabilitiesParams =
  paths['/v1/accounts/{account}/capabilities']['get']['parameters']['query'];

export type GetAccountsAccountCapabilitiesResponse =
  paths['/v1/accounts/{account}/capabilities']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_CAPABILITIES = new InjectionToken<
  (
    account: string,
    params?:
      | GetAccountsAccountCapabilitiesParams
      | (() => GetAccountsAccountCapabilitiesParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountsAccountCapabilitiesResponse>>
>('GET_ACCOUNTS_ACCOUNT_CAPABILITIES');

export function provideGetAccountsAccountCapabilities(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT_CAPABILITIES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetAccountsAccountCapabilitiesParams
          | (() => GetAccountsAccountCapabilitiesParams | undefined),
      ) =>
        httpResource<GetAccountsAccountCapabilitiesResponse>(() => ({
          url: `${base}/v1/accounts/${account}/capabilities`,
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
