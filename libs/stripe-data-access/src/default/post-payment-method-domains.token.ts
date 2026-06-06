import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodDomainsBody = NonNullable<
  paths['/v1/payment_method_domains']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodDomainsResponse =
  paths['/v1/payment_method_domains']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHOD_DOMAINS = new InjectionToken<
  (
    body: PostPaymentMethodDomainsBody | Signal<PostPaymentMethodDomainsBody>,
  ) => ReturnType<typeof httpResource<PostPaymentMethodDomainsResponse>>
>('POST_PAYMENT_METHOD_DOMAINS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostPaymentMethodDomainsBody | Signal<PostPaymentMethodDomainsBody>,
    ) =>
      httpResource<PostPaymentMethodDomainsResponse>(() => ({
        url: `${base}/v1/payment_method_domains`,
        method: 'POST',
        body,
      }));
  },
});
