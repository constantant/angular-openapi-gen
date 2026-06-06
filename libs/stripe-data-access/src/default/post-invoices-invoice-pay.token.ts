import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoicePayBody = NonNullable<
  paths['/v1/invoices/{invoice}/pay']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoicePayResponse =
  paths['/v1/invoices/{invoice}/pay']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_PAY = new InjectionToken<
  (
    invoice: string,
    body: PostInvoicesInvoicePayBody | Signal<PostInvoicesInvoicePayBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoicePayResponse>>
>('POST_INVOICES_INVOICE_PAY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body: PostInvoicesInvoicePayBody | Signal<PostInvoicesInvoicePayBody>,
    ) =>
      httpResource<PostInvoicesInvoicePayResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/pay`,
        method: 'POST',
        body,
      }));
  },
});
