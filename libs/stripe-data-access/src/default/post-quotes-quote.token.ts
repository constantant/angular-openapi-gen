import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostQuotesQuoteBody = NonNullable<
  paths['/v1/quotes/{quote}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostQuotesQuoteResponse =
  paths['/v1/quotes/{quote}']['post']['responses']['200']['content']['application/json'];

export const POST_QUOTES_QUOTE = new InjectionToken<
  (
    quote: string,
    body: PostQuotesQuoteBody | Signal<PostQuotesQuoteBody>,
  ) => ReturnType<typeof httpResource<PostQuotesQuoteResponse>>
>('POST_QUOTES_QUOTE');

export function providePostQuotesQuote(): FactoryProvider {
  return {
    provide: POST_QUOTES_QUOTE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        quote: string,
        body: PostQuotesQuoteBody | Signal<PostQuotesQuoteBody>,
      ) =>
        httpResource<PostQuotesQuoteResponse>(() => ({
          url: `${base}/v1/quotes/${quote}`,
          method: 'POST',
          body,
        }));
    },
  };
}
