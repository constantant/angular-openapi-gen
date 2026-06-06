import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountsAccountCapabilitiesCapabilityParams =
  paths['/v1/accounts/{account}/capabilities/{capability}']['get']['parameters']['query'];

export type GetAccountsAccountCapabilitiesCapabilityResponse =
  paths['/v1/accounts/{account}/capabilities/{capability}']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY = new InjectionToken<
  (
    account: string,
    capability: string,
    params?:
      | GetAccountsAccountCapabilitiesCapabilityParams
      | (() => GetAccountsAccountCapabilitiesCapabilityParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetAccountsAccountCapabilitiesCapabilityResponse>
  >
>('GET_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY');

export function provideGetAccountsAccountCapabilitiesCapability(): FactoryProvider {
  return {
    provide: GET_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        capability: string,
        params?:
          | GetAccountsAccountCapabilitiesCapabilityParams
          | (() => GetAccountsAccountCapabilitiesCapabilityParams | undefined),
      ) =>
        httpResource<GetAccountsAccountCapabilitiesCapabilityResponse>(() => ({
          url: `${base}/v1/accounts/${account}/capabilities/${capability}`,
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
