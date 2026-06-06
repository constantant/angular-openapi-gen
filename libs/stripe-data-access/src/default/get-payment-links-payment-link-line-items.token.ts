import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentLinksPaymentLinkLineItemsParams =
  paths['/v1/payment_links/{payment_link}/line_items']['get']['parameters']['query'];

type GetPaymentLinksPaymentLinkLineItemsResponse =
  paths['/v1/payment_links/{payment_link}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_LINKS_PAYMENT_LINK_LINE_ITEMS = new InjectionToken<
  (
    payment_link: string,
    params?: GetPaymentLinksPaymentLinkLineItemsParams,
  ) => ReturnType<
    typeof httpResource<GetPaymentLinksPaymentLinkLineItemsResponse>
  >
>('GET_PAYMENT_LINKS_PAYMENT_LINK_LINE_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      payment_link: string,
      params?: GetPaymentLinksPaymentLinkLineItemsParams,
    ) =>
      httpResource<GetPaymentLinksPaymentLinkLineItemsResponse>(() => ({
        url: `${base}/v1/payment_links/${payment_link}/line_items`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
