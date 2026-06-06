import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentMethodDomainsPaymentMethodDomainParams =
  paths['/v1/payment_method_domains/{payment_method_domain}']['get']['parameters']['query'];

type GetPaymentMethodDomainsPaymentMethodDomainResponse =
  paths['/v1/payment_method_domains/{payment_method_domain}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN =
  new InjectionToken<
    (
      payment_method_domain: string,
      params?: GetPaymentMethodDomainsPaymentMethodDomainParams,
    ) => ReturnType<
      typeof httpResource<GetPaymentMethodDomainsPaymentMethodDomainResponse>
    >
  >('GET_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        payment_method_domain: string,
        params?: GetPaymentMethodDomainsPaymentMethodDomainParams,
      ) =>
        httpResource<GetPaymentMethodDomainsPaymentMethodDomainResponse>(
          () => ({
            url: `${base}/v1/payment_method_domains/${payment_method_domain}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
