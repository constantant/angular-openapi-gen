import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicesInvoiceLinesParams =
  paths['/v1/invoices/{invoice}/lines']['get']['parameters']['query'];

type GetInvoicesInvoiceLinesResponse =
  paths['/v1/invoices/{invoice}/lines']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICES_INVOICE_LINES = new InjectionToken<
  (
    invoice: string,
    params?: GetInvoicesInvoiceLinesParams,
  ) => ReturnType<typeof httpResource<GetInvoicesInvoiceLinesResponse>>
>('GET_INVOICES_INVOICE_LINES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (invoice: string, params?: GetInvoicesInvoiceLinesParams) =>
      httpResource<GetInvoicesInvoiceLinesResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/lines`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
