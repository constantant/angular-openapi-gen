import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteInvoicesInvoiceBody = NonNullable<
  paths['/v1/invoices/{invoice}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteInvoicesInvoiceResponse =
  paths['/v1/invoices/{invoice}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_INVOICES_INVOICE = new InjectionToken<
  (
    invoice: string,
    body: DeleteInvoicesInvoiceBody | Signal<DeleteInvoicesInvoiceBody>,
  ) => ReturnType<typeof httpResource<DeleteInvoicesInvoiceResponse>>
>('DELETE_INVOICES_INVOICE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body: DeleteInvoicesInvoiceBody | Signal<DeleteInvoicesInvoiceBody>,
    ) =>
      httpResource<DeleteInvoicesInvoiceResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}`,
        method: 'DELETE',
        body,
      }));
  },
});
