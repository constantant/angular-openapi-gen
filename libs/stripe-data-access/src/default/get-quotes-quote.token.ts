import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetQuotesQuoteParams =
  paths['/v1/quotes/{quote}']['get']['parameters']['query'];

type GetQuotesQuoteResponse =
  paths['/v1/quotes/{quote}']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES_QUOTE = new InjectionToken<
  (
    quote: string,
    params?: GetQuotesQuoteParams,
  ) => ReturnType<typeof httpResource<GetQuotesQuoteResponse>>
>('GET_QUOTES_QUOTE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (quote: string, params?: GetQuotesQuoteParams) =>
      httpResource<GetQuotesQuoteResponse>(() => ({
        url: `${base}/v1/quotes/${quote}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
