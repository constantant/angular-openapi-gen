import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicePaymentsInvoicePaymentParams =
  paths['/v1/invoice_payments/{invoice_payment}']['get']['parameters']['query'];

type GetInvoicePaymentsInvoicePaymentResponse =
  paths['/v1/invoice_payments/{invoice_payment}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_PAYMENTS_INVOICE_PAYMENT = new InjectionToken<
  (
    invoice_payment: string,
    params?: GetInvoicePaymentsInvoicePaymentParams,
  ) => ReturnType<typeof httpResource<GetInvoicePaymentsInvoicePaymentResponse>>
>('GET_INVOICE_PAYMENTS_INVOICE_PAYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice_payment: string,
      params?: GetInvoicePaymentsInvoicePaymentParams,
    ) =>
      httpResource<GetInvoicePaymentsInvoicePaymentResponse>(() => ({
        url: `${base}/v1/invoice_payments/${invoice_payment}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
