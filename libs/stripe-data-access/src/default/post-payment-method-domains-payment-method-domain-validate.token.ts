import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentMethodDomainsPaymentMethodDomainValidateBody = NonNullable<
  paths['/v1/payment_method_domains/{payment_method_domain}/validate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentMethodDomainsPaymentMethodDomainValidateResponse =
  paths['/v1/payment_method_domains/{payment_method_domain}/validate']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN_VALIDATE =
  new InjectionToken<
    (
      payment_method_domain: string,
      body:
        | PostPaymentMethodDomainsPaymentMethodDomainValidateBody
        | Signal<PostPaymentMethodDomainsPaymentMethodDomainValidateBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentMethodDomainsPaymentMethodDomainValidateResponse>
    >
  >('POST_PAYMENT_METHOD_DOMAINS_PAYMENT_METHOD_DOMAIN_VALIDATE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        payment_method_domain: string,
        body:
          | PostPaymentMethodDomainsPaymentMethodDomainValidateBody
          | Signal<PostPaymentMethodDomainsPaymentMethodDomainValidateBody>,
      ) =>
        httpResource<PostPaymentMethodDomainsPaymentMethodDomainValidateResponse>(
          () => ({
            url: `${base}/v1/payment_method_domains/${payment_method_domain}/validate`,
            method: 'POST',
            body,
          }),
        );
    },
  });
