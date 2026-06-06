import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetQuotesQuoteLineItemsParams =
  paths['/v1/quotes/{quote}/line_items']['get']['parameters']['query'];

type GetQuotesQuoteLineItemsResponse =
  paths['/v1/quotes/{quote}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES_QUOTE_LINE_ITEMS = new InjectionToken<
  (
    quote: string,
    params?: GetQuotesQuoteLineItemsParams,
  ) => ReturnType<typeof httpResource<GetQuotesQuoteLineItemsResponse>>
>('GET_QUOTES_QUOTE_LINE_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (quote: string, params?: GetQuotesQuoteLineItemsParams) =>
      httpResource<GetQuotesQuoteLineItemsResponse>(() => ({
        url: `${base}/v1/quotes/${quote}/line_items`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
