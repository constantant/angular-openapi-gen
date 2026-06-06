import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicesInvoiceParams =
  paths['/v1/invoices/{invoice}']['get']['parameters']['query'];

type GetInvoicesInvoiceResponse =
  paths['/v1/invoices/{invoice}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICES_INVOICE = new InjectionToken<
  (
    invoice: string,
    params?: GetInvoicesInvoiceParams,
  ) => ReturnType<typeof httpResource<GetInvoicesInvoiceResponse>>
>('GET_INVOICES_INVOICE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (invoice: string, params?: GetInvoicesInvoiceParams) =>
      httpResource<GetInvoicesInvoiceResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
