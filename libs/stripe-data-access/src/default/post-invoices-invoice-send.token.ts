import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesInvoiceSendBody = NonNullable<
  paths['/v1/invoices/{invoice}/send']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesInvoiceSendResponse =
  paths['/v1/invoices/{invoice}/send']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_SEND = new InjectionToken<
  (
    invoice: string,
    body: PostInvoicesInvoiceSendBody | Signal<PostInvoicesInvoiceSendBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceSendResponse>>
>('POST_INVOICES_INVOICE_SEND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body: PostInvoicesInvoiceSendBody | Signal<PostInvoicesInvoiceSendBody>,
    ) =>
      httpResource<PostInvoicesInvoiceSendResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/send`,
        method: 'POST',
        body,
      }));
  },
});
