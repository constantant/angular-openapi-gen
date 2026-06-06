import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteApplePayDomainsDomainBody = NonNullable<
  paths['/v1/apple_pay/domains/{domain}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteApplePayDomainsDomainResponse =
  paths['/v1/apple_pay/domains/{domain}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_APPLE_PAY_DOMAINS_DOMAIN = new InjectionToken<
  (
    domain: string,
    body:
      | DeleteApplePayDomainsDomainBody
      | Signal<DeleteApplePayDomainsDomainBody>,
  ) => ReturnType<typeof httpResource<DeleteApplePayDomainsDomainResponse>>
>('DELETE_APPLE_PAY_DOMAINS_DOMAIN');

export function provideDeleteApplePayDomainsDomain(): FactoryProvider {
  return {
    provide: DELETE_APPLE_PAY_DOMAINS_DOMAIN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        domain: string,
        body:
          | DeleteApplePayDomainsDomainBody
          | Signal<DeleteApplePayDomainsDomainBody>,
      ) =>
        httpResource<DeleteApplePayDomainsDomainResponse>(() => ({
          url: `${base}/v1/apple_pay/domains/${domain}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
