import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicePaymentsParams =
  paths['/v1/invoice_payments']['get']['parameters']['query'];

type GetInvoicePaymentsResponse =
  paths['/v1/invoice_payments']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_PAYMENTS = new InjectionToken<
  (
    params?: GetInvoicePaymentsParams,
  ) => ReturnType<typeof httpResource<GetInvoicePaymentsResponse>>
>('GET_INVOICE_PAYMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetInvoicePaymentsParams) =>
      httpResource<GetInvoicePaymentsResponse>(() => ({
        url: `${base}/v1/invoice_payments`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
