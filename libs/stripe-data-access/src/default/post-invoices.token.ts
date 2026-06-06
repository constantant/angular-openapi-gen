import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesBody = NonNullable<
  paths['/v1/invoices']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesResponse =
  paths['/v1/invoices']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES = new InjectionToken<
  (
    body: PostInvoicesBody | Signal<PostInvoicesBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesResponse>>
>('POST_INVOICES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostInvoicesBody | Signal<PostInvoicesBody>) =>
      httpResource<PostInvoicesResponse>(() => ({
        url: `${base}/v1/invoices`,
        method: 'POST',
        body,
      }));
  },
});
