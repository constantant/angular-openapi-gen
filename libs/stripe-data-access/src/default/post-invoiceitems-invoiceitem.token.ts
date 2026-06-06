import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoiceitemsInvoiceitemBody = NonNullable<
  paths['/v1/invoiceitems/{invoiceitem}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoiceitemsInvoiceitemResponse =
  paths['/v1/invoiceitems/{invoiceitem}']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICEITEMS_INVOICEITEM = new InjectionToken<
  (
    invoiceitem: string,
    body:
      | PostInvoiceitemsInvoiceitemBody
      | Signal<PostInvoiceitemsInvoiceitemBody>,
  ) => ReturnType<typeof httpResource<PostInvoiceitemsInvoiceitemResponse>>
>('POST_INVOICEITEMS_INVOICEITEM');

export function providePostInvoiceitemsInvoiceitem(): FactoryProvider {
  return {
    provide: POST_INVOICEITEMS_INVOICEITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        invoiceitem: string,
        body:
          | PostInvoiceitemsInvoiceitemBody
          | Signal<PostInvoiceitemsInvoiceitemBody>,
      ) =>
        httpResource<PostInvoiceitemsInvoiceitemResponse>(() => ({
          url: `${base}/v1/invoiceitems/${invoiceitem}`,
          method: 'POST',
          body,
        }));
    },
  };
}
