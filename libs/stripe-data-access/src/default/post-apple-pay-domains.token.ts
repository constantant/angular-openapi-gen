import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostApplePayDomainsBody = NonNullable<
  paths['/v1/apple_pay/domains']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostApplePayDomainsResponse =
  paths['/v1/apple_pay/domains']['post']['responses']['200']['content']['application/json'];

export const POST_APPLE_PAY_DOMAINS = new InjectionToken<
  (
    body: PostApplePayDomainsBody | Signal<PostApplePayDomainsBody>,
  ) => ReturnType<typeof httpResource<PostApplePayDomainsResponse>>
>('POST_APPLE_PAY_DOMAINS');

export function providePostApplePayDomains(): FactoryProvider {
  return {
    provide: POST_APPLE_PAY_DOMAINS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body: PostApplePayDomainsBody | Signal<PostApplePayDomainsBody>,
      ) =>
        httpResource<PostApplePayDomainsResponse>(() => ({
          url: `${base}/v1/apple_pay/domains`,
          method: 'POST',
          body,
        }));
    },
  };
}
