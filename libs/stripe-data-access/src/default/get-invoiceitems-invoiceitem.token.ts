import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoiceitemsInvoiceitemParams =
  paths['/v1/invoiceitems/{invoiceitem}']['get']['parameters']['query'];

export type GetInvoiceitemsInvoiceitemResponse =
  paths['/v1/invoiceitems/{invoiceitem}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICEITEMS_INVOICEITEM = new InjectionToken<
  (
    invoiceitem: string,
    params?:
      | GetInvoiceitemsInvoiceitemParams
      | (() => GetInvoiceitemsInvoiceitemParams | undefined),
  ) => ReturnType<typeof httpResource<GetInvoiceitemsInvoiceitemResponse>>
>('GET_INVOICEITEMS_INVOICEITEM');

export function provideGetInvoiceitemsInvoiceitem(): FactoryProvider {
  return {
    provide: GET_INVOICEITEMS_INVOICEITEM,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        invoiceitem: string,
        params?:
          | GetInvoiceitemsInvoiceitemParams
          | (() => GetInvoiceitemsInvoiceitemParams | undefined),
      ) =>
        httpResource<GetInvoiceitemsInvoiceitemResponse>(() => ({
          url: `${base}/v1/invoiceitems/${invoiceitem}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
