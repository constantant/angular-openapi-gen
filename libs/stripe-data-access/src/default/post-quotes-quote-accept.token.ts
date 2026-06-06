import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostQuotesQuoteAcceptBody = NonNullable<
  paths['/v1/quotes/{quote}/accept']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostQuotesQuoteAcceptResponse =
  paths['/v1/quotes/{quote}/accept']['post']['responses']['200']['content']['application/json'];

export const POST_QUOTES_QUOTE_ACCEPT = new InjectionToken<
  (
    quote: string,
    body: PostQuotesQuoteAcceptBody | Signal<PostQuotesQuoteAcceptBody>,
  ) => ReturnType<typeof httpResource<PostQuotesQuoteAcceptResponse>>
>('POST_QUOTES_QUOTE_ACCEPT');

export function providePostQuotesQuoteAccept(): FactoryProvider {
  return {
    provide: POST_QUOTES_QUOTE_ACCEPT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        quote: string,
        body: PostQuotesQuoteAcceptBody | Signal<PostQuotesQuoteAcceptBody>,
      ) =>
        httpResource<PostQuotesQuoteAcceptResponse>(() => ({
          url: `${base}/v1/quotes/${quote}/accept`,
          method: 'POST',
          body,
        }));
    },
  };
}
