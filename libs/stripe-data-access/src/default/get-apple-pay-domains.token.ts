import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetApplePayDomainsParams =
  paths['/v1/apple_pay/domains']['get']['parameters']['query'];

export type GetApplePayDomainsResponse =
  paths['/v1/apple_pay/domains']['get']['responses']['200']['content']['application/json'];

export const GET_APPLE_PAY_DOMAINS = new InjectionToken<
  (
    params?:
      | GetApplePayDomainsParams
      | (() => GetApplePayDomainsParams | undefined),
  ) => ReturnType<typeof httpResource<GetApplePayDomainsResponse>>
>('GET_APPLE_PAY_DOMAINS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetApplePayDomainsParams
        | (() => GetApplePayDomainsParams | undefined),
    ) =>
      httpResource<GetApplePayDomainsResponse>(() => ({
        url: `${base}/v1/apple_pay/domains`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
