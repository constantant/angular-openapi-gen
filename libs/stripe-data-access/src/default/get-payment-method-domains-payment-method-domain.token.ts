import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodDomainsPaymentMethodDomainParams =
  paths['/v1/payment_method_domains/{payment_method_domain}']['get']['parameters']['query'];

export type GetPaymentMethodDomainsPaymentMethodDomainResponse =
  paths['/v1/payment_method_domains/{payment_method_domain}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN =
  new InjectionToken<
    (
      paymentMethodDomain: string,
      params?:
        | GetPaymentMethodDomainsPaymentMethodDomainParams
        | (() => GetPaymentMethodDomainsPaymentMethodDomainParams | undefined),
    ) => ReturnType<
      typeof httpResource<GetPaymentMethodDomainsPaymentMethodDomainResponse>
    >
  >('GET_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN');

export function provideGetPaymentMethodDomainsPaymentMethodDomain(): FactoryProvider {
  return {
    provide: GET_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        paymentMethodDomain: string,
        params?:
          | GetPaymentMethodDomainsPaymentMethodDomainParams
          | (() =>
              | GetPaymentMethodDomainsPaymentMethodDomainParams
              | undefined),
      ) =>
        httpResource<GetPaymentMethodDomainsPaymentMethodDomainResponse>(
          () => ({
            url: `${base}/v1/payment_method_domains/${paymentMethodDomain}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
