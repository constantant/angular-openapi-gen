import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoicesSearchParams =
  paths['/v1/invoices/search']['get']['parameters']['query'];

type GetInvoicesSearchResponse =
  paths['/v1/invoices/search']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICES_SEARCH = new InjectionToken<
  (
    params?: GetInvoicesSearchParams,
  ) => ReturnType<typeof httpResource<GetInvoicesSearchResponse>>
>('GET_INVOICES_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetInvoicesSearchParams) =>
      httpResource<GetInvoicesSearchResponse>(() => ({
        url: `${base}/v1/invoices/search`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
