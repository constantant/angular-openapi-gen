import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetQuotesQuoteLineItemsParams =
  paths['/v1/quotes/{quote}/line_items']['get']['parameters']['query'];

export type GetQuotesQuoteLineItemsResponse =
  paths['/v1/quotes/{quote}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES_QUOTE_LINE_ITEMS = new InjectionToken<
  (
    quote: string,
    params?:
      | GetQuotesQuoteLineItemsParams
      | (() => GetQuotesQuoteLineItemsParams | undefined),
  ) => ReturnType<typeof httpResource<GetQuotesQuoteLineItemsResponse>>
>('GET_QUOTES_QUOTE_LINE_ITEMS');

export function provideGetQuotesQuoteLineItems(): FactoryProvider {
  return {
    provide: GET_QUOTES_QUOTE_LINE_ITEMS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        quote: string,
        params?:
          | GetQuotesQuoteLineItemsParams
          | (() => GetQuotesQuoteLineItemsParams | undefined),
      ) =>
        httpResource<GetQuotesQuoteLineItemsResponse>(() => ({
          url: `${base}/v1/quotes/${quote}/line_items`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
