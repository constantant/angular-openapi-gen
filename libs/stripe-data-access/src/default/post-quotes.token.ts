import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostQuotesBody = NonNullable<
  paths['/v1/quotes']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostQuotesResponse =
  paths['/v1/quotes']['post']['responses']['200']['content']['application/json'];

export const POST_QUOTES = new InjectionToken<
  (
    body: PostQuotesBody | Signal<PostQuotesBody>,
  ) => ReturnType<typeof httpResource<PostQuotesResponse>>
>('POST_QUOTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostQuotesBody | Signal<PostQuotesBody>) =>
      httpResource<PostQuotesResponse>(() => ({
        url: `${base}/v1/quotes`,
        method: 'POST',
        body,
      }));
  },
});
