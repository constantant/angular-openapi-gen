import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodDomainsPaymentMethodDomainBody = NonNullable<
  paths['/v1/payment_method_domains/{payment_method_domain}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodDomainsPaymentMethodDomainResponse =
  paths['/v1/payment_method_domains/{payment_method_domain}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN =
  new InjectionToken<
    (
      paymentMethodDomain: string,
      body:
        | PostPaymentMethodDomainsPaymentMethodDomainBody
        | Signal<PostPaymentMethodDomainsPaymentMethodDomainBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentMethodDomainsPaymentMethodDomainResponse>
    >
  >('POST_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        paymentMethodDomain: string,
        body:
          | PostPaymentMethodDomainsPaymentMethodDomainBody
          | Signal<PostPaymentMethodDomainsPaymentMethodDomainBody>,
      ) =>
        httpResource<PostPaymentMethodDomainsPaymentMethodDomainResponse>(
          () => ({
            url: `${base}/v1/payment_method_domains/${paymentMethodDomain}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
