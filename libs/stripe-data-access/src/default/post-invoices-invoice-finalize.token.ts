import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesInvoiceFinalizeBody = NonNullable<
  paths['/v1/invoices/{invoice}/finalize']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesInvoiceFinalizeResponse =
  paths['/v1/invoices/{invoice}/finalize']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_FINALIZE = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceFinalizeBody
      | Signal<PostInvoicesInvoiceFinalizeBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceFinalizeResponse>>
>('POST_INVOICES_INVOICE_FINALIZE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body:
        | PostInvoicesInvoiceFinalizeBody
        | Signal<PostInvoicesInvoiceFinalizeBody>,
    ) =>
      httpResource<PostInvoicesInvoiceFinalizeResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/finalize`,
        method: 'POST',
        body,
      }));
  },
});
