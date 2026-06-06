import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicesParams = paths['/v1/invoices']['get']['parameters']['query'];

type GetInvoicesResponse =
  paths['/v1/invoices']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICES = new InjectionToken<
  (
    params?: GetInvoicesParams,
  ) => ReturnType<typeof httpResource<GetInvoicesResponse>>
>('GET_INVOICES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetInvoicesParams) =>
      httpResource<GetInvoicesResponse>(() => ({
        url: `${base}/v1/invoices`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
