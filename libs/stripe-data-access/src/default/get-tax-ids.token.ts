import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxIdsParams = paths['/v1/tax_ids']['get']['parameters']['query'];

type GetTaxIdsResponse =
  paths['/v1/tax_ids']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_IDS = new InjectionToken<
  (
    params?: GetTaxIdsParams,
  ) => ReturnType<typeof httpResource<GetTaxIdsResponse>>
>('GET_TAX_IDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTaxIdsParams) =>
      httpResource<GetTaxIdsResponse>(() => ({
        url: `${base}/v1/tax_ids`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
