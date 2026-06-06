import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountCapabilitiesCapabilityBody = NonNullable<
  paths['/v1/accounts/{account}/capabilities/{capability}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountCapabilitiesCapabilityResponse =
  paths['/v1/accounts/{account}/capabilities/{capability}']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY = new InjectionToken<
  (
    account: string,
    capability: string,
    body:
      | PostAccountsAccountCapabilitiesCapabilityBody
      | Signal<PostAccountsAccountCapabilitiesCapabilityBody>,
  ) => ReturnType<
    typeof httpResource<PostAccountsAccountCapabilitiesCapabilityResponse>
  >
>('POST_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY');

export function providePostAccountsAccountCapabilitiesCapability(): FactoryProvider {
  return {
    provide: POST_ACCOUNTS_ACCOUNT_CAPABILITIES_CAPABILITY,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        capability: string,
        body:
          | PostAccountsAccountCapabilitiesCapabilityBody
          | Signal<PostAccountsAccountCapabilitiesCapabilityBody>,
      ) =>
        httpResource<PostAccountsAccountCapabilitiesCapabilityResponse>(() => ({
          url: `${base}/v1/accounts/${account}/capabilities/${capability}`,
          method: 'POST',
          body,
        }));
    },
  };
}
