import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoicePaymentsInvoicePaymentParams =
  paths['/v1/invoice_payments/{invoice_payment}']['get']['parameters']['query'];

export type GetInvoicePaymentsInvoicePaymentResponse =
  paths['/v1/invoice_payments/{invoice_payment}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_PAYMENTS_INVOICE_PAYMENT = new InjectionToken<
  (
    invoicePayment: string,
    params?:
      | GetInvoicePaymentsInvoicePaymentParams
      | (() => GetInvoicePaymentsInvoicePaymentParams | undefined),
  ) => ReturnType<typeof httpResource<GetInvoicePaymentsInvoicePaymentResponse>>
>('GET_INVOICE_PAYMENTS_INVOICE_PAYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoicePayment: string,
      params?:
        | GetInvoicePaymentsInvoicePaymentParams
        | (() => GetInvoicePaymentsInvoicePaymentParams | undefined),
    ) =>
      httpResource<GetInvoicePaymentsInvoicePaymentResponse>(() => ({
        url: `${base}/v1/invoice_payments/${invoicePayment}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
