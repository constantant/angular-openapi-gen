import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesInvoiceVoidBody = NonNullable<
  paths['/v1/invoices/{invoice}/void']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesInvoiceVoidResponse =
  paths['/v1/invoices/{invoice}/void']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_VOID = new InjectionToken<
  (
    invoice: string,
    body: PostInvoicesInvoiceVoidBody | Signal<PostInvoicesInvoiceVoidBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceVoidResponse>>
>('POST_INVOICES_INVOICE_VOID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body: PostInvoicesInvoiceVoidBody | Signal<PostInvoicesInvoiceVoidBody>,
    ) =>
      httpResource<PostInvoicesInvoiceVoidResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/void`,
        method: 'POST',
        body,
      }));
  },
});
