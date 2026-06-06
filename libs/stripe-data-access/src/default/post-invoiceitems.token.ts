import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoiceitemsBody = NonNullable<
  paths['/v1/invoiceitems']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoiceitemsResponse =
  paths['/v1/invoiceitems']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICEITEMS = new InjectionToken<
  (
    body: PostInvoiceitemsBody | Signal<PostInvoiceitemsBody>,
  ) => ReturnType<typeof httpResource<PostInvoiceitemsResponse>>
>('POST_INVOICEITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostInvoiceitemsBody | Signal<PostInvoiceitemsBody>) =>
      httpResource<PostInvoiceitemsResponse>(() => ({
        url: `${base}/v1/invoiceitems`,
        method: 'POST',
        body,
      }));
  },
});
