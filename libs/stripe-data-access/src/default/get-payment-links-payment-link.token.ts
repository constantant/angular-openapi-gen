import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentLinksPaymentLinkParams =
  paths['/v1/payment_links/{payment_link}']['get']['parameters']['query'];

type GetPaymentLinksPaymentLinkResponse =
  paths['/v1/payment_links/{payment_link}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_LINKS_PAYMENT_LINK = new InjectionToken<
  (
    payment_link: string,
    params?: GetPaymentLinksPaymentLinkParams,
  ) => ReturnType<typeof httpResource<GetPaymentLinksPaymentLinkResponse>>
>('GET_PAYMENT_LINKS_PAYMENT_LINK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (payment_link: string, params?: GetPaymentLinksPaymentLinkParams) =>
      httpResource<GetPaymentLinksPaymentLinkResponse>(() => ({
        url: `${base}/v1/payment_links/${payment_link}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
