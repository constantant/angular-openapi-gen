import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoiceUpdateLinesBody = NonNullable<
  paths['/v1/invoices/{invoice}/update_lines']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoiceUpdateLinesResponse =
  paths['/v1/invoices/{invoice}/update_lines']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_UPDATE_LINES = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceUpdateLinesBody
      | Signal<PostInvoicesInvoiceUpdateLinesBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceUpdateLinesResponse>>
>('POST_INVOICES_INVOICE_UPDATE_LINES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body:
        | PostInvoicesInvoiceUpdateLinesBody
        | Signal<PostInvoicesInvoiceUpdateLinesBody>,
    ) =>
      httpResource<PostInvoicesInvoiceUpdateLinesResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/update_lines`,
        method: 'POST',
        body,
      }));
  },
});
