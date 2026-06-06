import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoicePaymentsParams =
  paths['/v1/invoice_payments']['get']['parameters']['query'];

export type GetInvoicePaymentsResponse =
  paths['/v1/invoice_payments']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_PAYMENTS = new InjectionToken<
  (
    params?:
      | GetInvoicePaymentsParams
      | (() => GetInvoicePaymentsParams | undefined),
  ) => ReturnType<typeof httpResource<GetInvoicePaymentsResponse>>
>('GET_INVOICE_PAYMENTS');

export function provideGetInvoicePayments(): FactoryProvider {
  return {
    provide: GET_INVOICE_PAYMENTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetInvoicePaymentsParams
          | (() => GetInvoicePaymentsParams | undefined),
      ) =>
        httpResource<GetInvoicePaymentsResponse>(() => ({
          url: `${base}/v1/invoice_payments`,
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
