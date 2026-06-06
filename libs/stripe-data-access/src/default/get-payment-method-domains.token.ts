import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodDomainsParams =
  paths['/v1/payment_method_domains']['get']['parameters']['query'];

export type GetPaymentMethodDomainsResponse =
  paths['/v1/payment_method_domains']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_DOMAINS = new InjectionToken<
  (
    params?:
      | GetPaymentMethodDomainsParams
      | (() => GetPaymentMethodDomainsParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentMethodDomainsResponse>>
>('GET_PAYMENT_METHOD_DOMAINS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetPaymentMethodDomainsParams
        | (() => GetPaymentMethodDomainsParams | undefined),
    ) =>
      httpResource<GetPaymentMethodDomainsResponse>(() => ({
        url: `${base}/v1/payment_method_domains`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
