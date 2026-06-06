import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoiceitemsInvoiceitemParams =
  paths['/v1/invoiceitems/{invoiceitem}']['get']['parameters']['query'];

type GetInvoiceitemsInvoiceitemResponse =
  paths['/v1/invoiceitems/{invoiceitem}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICEITEMS_INVOICEITEM = new InjectionToken<
  (
    invoiceitem: string,
    params?: GetInvoiceitemsInvoiceitemParams,
  ) => ReturnType<typeof httpResource<GetInvoiceitemsInvoiceitemResponse>>
>('GET_INVOICEITEMS_INVOICEITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (invoiceitem: string, params?: GetInvoiceitemsInvoiceitemParams) =>
      httpResource<GetInvoiceitemsInvoiceitemResponse>(() => ({
        url: `${base}/v1/invoiceitems/${invoiceitem}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
