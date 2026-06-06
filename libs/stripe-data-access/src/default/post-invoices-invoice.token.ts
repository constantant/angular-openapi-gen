import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoiceBody = NonNullable<
  paths['/v1/invoices/{invoice}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoiceResponse =
  paths['/v1/invoices/{invoice}']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE = new InjectionToken<
  (
    invoice: string,
    body: PostInvoicesInvoiceBody | Signal<PostInvoicesInvoiceBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceResponse>>
>('POST_INVOICES_INVOICE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body: PostInvoicesInvoiceBody | Signal<PostInvoicesInvoiceBody>,
    ) =>
      httpResource<PostInvoicesInvoiceResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}`,
        method: 'POST',
        body,
      }));
  },
});
