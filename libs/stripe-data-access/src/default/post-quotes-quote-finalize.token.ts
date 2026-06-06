import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostQuotesQuoteFinalizeBody = NonNullable<
  paths['/v1/quotes/{quote}/finalize']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostQuotesQuoteFinalizeResponse =
  paths['/v1/quotes/{quote}/finalize']['post']['responses']['200']['content']['application/json'];

export const POST_QUOTES_QUOTE_FINALIZE = new InjectionToken<
  (
    quote: string,
    body: PostQuotesQuoteFinalizeBody | Signal<PostQuotesQuoteFinalizeBody>,
  ) => ReturnType<typeof httpResource<PostQuotesQuoteFinalizeResponse>>
>('POST_QUOTES_QUOTE_FINALIZE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      quote: string,
      body: PostQuotesQuoteFinalizeBody | Signal<PostQuotesQuoteFinalizeBody>,
    ) =>
      httpResource<PostQuotesQuoteFinalizeResponse>(() => ({
        url: `${base}/v1/quotes/${quote}/finalize`,
        method: 'POST',
        body,
      }));
  },
});
