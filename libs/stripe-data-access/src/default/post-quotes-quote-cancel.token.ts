import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostQuotesQuoteCancelBody = NonNullable<
  paths['/v1/quotes/{quote}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostQuotesQuoteCancelResponse =
  paths['/v1/quotes/{quote}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_QUOTES_QUOTE_CANCEL = new InjectionToken<
  (
    quote: string,
    body: PostQuotesQuoteCancelBody | Signal<PostQuotesQuoteCancelBody>,
  ) => ReturnType<typeof httpResource<PostQuotesQuoteCancelResponse>>
>('POST_QUOTES_QUOTE_CANCEL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      quote: string,
      body: PostQuotesQuoteCancelBody | Signal<PostQuotesQuoteCancelBody>,
    ) =>
      httpResource<PostQuotesQuoteCancelResponse>(() => ({
        url: `${base}/v1/quotes/${quote}/cancel`,
        method: 'POST',
        body,
      }));
  },
});
