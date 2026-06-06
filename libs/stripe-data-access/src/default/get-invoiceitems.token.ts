import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoiceitemsParams =
  paths['/v1/invoiceitems']['get']['parameters']['query'];

export type GetInvoiceitemsResponse =
  paths['/v1/invoiceitems']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICEITEMS = new InjectionToken<
  (
    params?: GetInvoiceitemsParams | (() => GetInvoiceitemsParams | undefined),
  ) => ReturnType<typeof httpResource<GetInvoiceitemsResponse>>
>('GET_INVOICEITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetInvoiceitemsParams
        | (() => GetInvoiceitemsParams | undefined),
    ) =>
      httpResource<GetInvoiceitemsResponse>(() => ({
        url: `${base}/v1/invoiceitems`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
