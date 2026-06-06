import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetApplePayDomainsDomainParams =
  paths['/v1/apple_pay/domains/{domain}']['get']['parameters']['query'];

type GetApplePayDomainsDomainResponse =
  paths['/v1/apple_pay/domains/{domain}']['get']['responses']['200']['content']['application/json'];

export const GET_APPLE_PAY_DOMAINS_DOMAIN = new InjectionToken<
  (
    domain: string,
    params?: GetApplePayDomainsDomainParams,
  ) => ReturnType<typeof httpResource<GetApplePayDomainsDomainResponse>>
>('GET_APPLE_PAY_DOMAINS_DOMAIN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (domain: string, params?: GetApplePayDomainsDomainParams) =>
      httpResource<GetApplePayDomainsDomainResponse>(() => ({
        url: `${base}/v1/apple_pay/domains/${domain}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
