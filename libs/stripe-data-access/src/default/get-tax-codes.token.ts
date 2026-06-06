import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxCodesParams = paths['/v1/tax_codes']['get']['parameters']['query'];

type GetTaxCodesResponse =
  paths['/v1/tax_codes']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CODES = new InjectionToken<
  (
    params?: GetTaxCodesParams,
  ) => ReturnType<typeof httpResource<GetTaxCodesResponse>>
>('GET_TAX_CODES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTaxCodesParams) =>
      httpResource<GetTaxCodesResponse>(() => ({
        url: `${base}/v1/tax_codes`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
