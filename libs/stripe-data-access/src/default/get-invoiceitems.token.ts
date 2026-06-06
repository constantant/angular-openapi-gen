import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoiceitemsParams =
  paths['/v1/invoiceitems']['get']['parameters']['query'];

type GetInvoiceitemsResponse =
  paths['/v1/invoiceitems']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICEITEMS = new InjectionToken<
  (
    params?: GetInvoiceitemsParams,
  ) => ReturnType<typeof httpResource<GetInvoiceitemsResponse>>
>('GET_INVOICEITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetInvoiceitemsParams) =>
      httpResource<GetInvoiceitemsResponse>(() => ({
        url: `${base}/v1/invoiceitems`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
