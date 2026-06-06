import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoiceAddLinesBody = NonNullable<
  paths['/v1/invoices/{invoice}/add_lines']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoiceAddLinesResponse =
  paths['/v1/invoices/{invoice}/add_lines']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_ADD_LINES = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceAddLinesBody
      | Signal<PostInvoicesInvoiceAddLinesBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceAddLinesResponse>>
>('POST_INVOICES_INVOICE_ADD_LINES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body:
        | PostInvoicesInvoiceAddLinesBody
        | Signal<PostInvoicesInvoiceAddLinesBody>,
    ) =>
      httpResource<PostInvoicesInvoiceAddLinesResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/add_lines`,
        method: 'POST',
        body,
      }));
  },
});
