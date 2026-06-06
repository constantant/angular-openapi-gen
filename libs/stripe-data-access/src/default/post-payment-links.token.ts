import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentLinksBody = NonNullable<
  paths['/v1/payment_links']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentLinksResponse =
  paths['/v1/payment_links']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_LINKS = new InjectionToken<
  (
    body: PostPaymentLinksBody | Signal<PostPaymentLinksBody>,
  ) => ReturnType<typeof httpResource<PostPaymentLinksResponse>>
>('POST_PAYMENT_LINKS');

export function providePostPaymentLinks(): FactoryProvider {
  return {
    provide: POST_PAYMENT_LINKS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostPaymentLinksBody | Signal<PostPaymentLinksBody>) =>
        httpResource<PostPaymentLinksResponse>(() => ({
          url: `${base}/v1/payment_links`,
          method: 'POST',
          body,
        }));
    },
  };
}
