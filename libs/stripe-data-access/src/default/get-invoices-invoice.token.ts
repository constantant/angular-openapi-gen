import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoicesInvoiceParams =
  paths['/v1/invoices/{invoice}']['get']['parameters']['query'];

export type GetInvoicesInvoiceResponse =
  paths['/v1/invoices/{invoice}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICES_INVOICE = new InjectionToken<
  (
    invoice: string,
    params?:
      | GetInvoicesInvoiceParams
      | (() => GetInvoicesInvoiceParams | undefined),
  ) => ReturnType<typeof httpResource<GetInvoicesInvoiceResponse>>
>('GET_INVOICES_INVOICE');

export function provideGetInvoicesInvoice(): FactoryProvider {
  return {
    provide: GET_INVOICES_INVOICE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        invoice: string,
        params?:
          | GetInvoicesInvoiceParams
          | (() => GetInvoicesInvoiceParams | undefined),
      ) =>
        httpResource<GetInvoicesInvoiceResponse>(() => ({
          url: `${base}/v1/invoices/${invoice}`,
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
