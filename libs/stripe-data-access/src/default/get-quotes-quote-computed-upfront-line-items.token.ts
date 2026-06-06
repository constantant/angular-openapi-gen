import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetQuotesQuoteComputedUpfrontLineItemsParams =
  paths['/v1/quotes/{quote}/computed_upfront_line_items']['get']['parameters']['query'];

export type GetQuotesQuoteComputedUpfrontLineItemsResponse =
  paths['/v1/quotes/{quote}/computed_upfront_line_items']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES_QUOTE_COMPUTED_UPFRONT_LINE_ITEMS = new InjectionToken<
  (
    quote: string,
    params?:
      | GetQuotesQuoteComputedUpfrontLineItemsParams
      | (() => GetQuotesQuoteComputedUpfrontLineItemsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetQuotesQuoteComputedUpfrontLineItemsResponse>
  >
>('GET_QUOTES_QUOTE_COMPUTED_UPFRONT_LINE_ITEMS');

export function provideGetQuotesQuoteComputedUpfrontLineItems(): FactoryProvider {
  return {
    provide: GET_QUOTES_QUOTE_COMPUTED_UPFRONT_LINE_ITEMS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        quote: string,
        params?:
          | GetQuotesQuoteComputedUpfrontLineItemsParams
          | (() => GetQuotesQuoteComputedUpfrontLineItemsParams | undefined),
      ) =>
        httpResource<GetQuotesQuoteComputedUpfrontLineItemsResponse>(() => ({
          url: `${base}/v1/quotes/${quote}/computed_upfront_line_items`,
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
