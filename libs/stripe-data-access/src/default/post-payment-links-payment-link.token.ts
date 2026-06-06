import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentLinksPaymentLinkBody = NonNullable<
  paths['/v1/payment_links/{payment_link}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentLinksPaymentLinkResponse =
  paths['/v1/payment_links/{payment_link}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_LINKS_PAYMENT_LINK = new InjectionToken<
  (
    paymentLink: string,
    body:
      | PostPaymentLinksPaymentLinkBody
      | Signal<PostPaymentLinksPaymentLinkBody>,
  ) => ReturnType<typeof httpResource<PostPaymentLinksPaymentLinkResponse>>
>('POST_PAYMENT_LINKS_PAYMENT_LINK');

export function providePostPaymentLinksPaymentLink(): FactoryProvider {
  return {
    provide: POST_PAYMENT_LINKS_PAYMENT_LINK,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        paymentLink: string,
        body:
          | PostPaymentLinksPaymentLinkBody
          | Signal<PostPaymentLinksPaymentLinkBody>,
      ) =>
        httpResource<PostPaymentLinksPaymentLinkResponse>(() => ({
          url: `${base}/v1/payment_links/${paymentLink}`,
          method: 'POST',
          body,
        }));
    },
  };
}
