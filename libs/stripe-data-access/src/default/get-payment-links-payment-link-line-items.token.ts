import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentLinksPaymentLinkLineItemsParams =
  paths['/v1/payment_links/{payment_link}/line_items']['get']['parameters']['query'];

export type GetPaymentLinksPaymentLinkLineItemsResponse =
  paths['/v1/payment_links/{payment_link}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_LINKS_PAYMENT_LINK_LINE_ITEMS = new InjectionToken<
  (
    paymentLink: string,
    params?:
      | GetPaymentLinksPaymentLinkLineItemsParams
      | (() => GetPaymentLinksPaymentLinkLineItemsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetPaymentLinksPaymentLinkLineItemsResponse>
  >
>('GET_PAYMENT_LINKS_PAYMENT_LINK_LINE_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      paymentLink: string,
      params?:
        | GetPaymentLinksPaymentLinkLineItemsParams
        | (() => GetPaymentLinksPaymentLinkLineItemsParams | undefined),
    ) =>
      httpResource<GetPaymentLinksPaymentLinkLineItemsResponse>(() => ({
        url: `${base}/v1/payment_links/${paymentLink}/line_items`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
