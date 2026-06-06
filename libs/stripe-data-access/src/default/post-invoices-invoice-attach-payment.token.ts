import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesInvoiceAttachPaymentBody = NonNullable<
  paths['/v1/invoices/{invoice}/attach_payment']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesInvoiceAttachPaymentResponse =
  paths['/v1/invoices/{invoice}/attach_payment']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_ATTACH_PAYMENT = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceAttachPaymentBody
      | Signal<PostInvoicesInvoiceAttachPaymentBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceAttachPaymentResponse>>
>('POST_INVOICES_INVOICE_ATTACH_PAYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body:
        | PostInvoicesInvoiceAttachPaymentBody
        | Signal<PostInvoicesInvoiceAttachPaymentBody>,
    ) =>
      httpResource<PostInvoicesInvoiceAttachPaymentResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/attach_payment`,
        method: 'POST',
        body,
      }));
  },
});
