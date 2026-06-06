import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteInvoiceitemsInvoiceitemBody = NonNullable<
  paths['/v1/invoiceitems/{invoiceitem}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteInvoiceitemsInvoiceitemResponse =
  paths['/v1/invoiceitems/{invoiceitem}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_INVOICEITEMS_INVOICEITEM = new InjectionToken<
  (
    invoiceitem: string,
    body:
      | DeleteInvoiceitemsInvoiceitemBody
      | Signal<DeleteInvoiceitemsInvoiceitemBody>,
  ) => ReturnType<typeof httpResource<DeleteInvoiceitemsInvoiceitemResponse>>
>('DELETE_INVOICEITEMS_INVOICEITEM');

export function provideDeleteInvoiceitemsInvoiceitem(): FactoryProvider {
  return {
    provide: DELETE_INVOICEITEMS_INVOICEITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        invoiceitem: string,
        body:
          | DeleteInvoiceitemsInvoiceitemBody
          | Signal<DeleteInvoiceitemsInvoiceitemBody>,
      ) =>
        httpResource<DeleteInvoiceitemsInvoiceitemResponse>(() => ({
          url: `${base}/v1/invoiceitems/${invoiceitem}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
