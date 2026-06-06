import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxCodesParams =
  paths['/v1/tax_codes']['get']['parameters']['query'];

export type GetTaxCodesResponse =
  paths['/v1/tax_codes']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CODES = new InjectionToken<
  (
    params?: GetTaxCodesParams | (() => GetTaxCodesParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxCodesResponse>>
>('GET_TAX_CODES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?: GetTaxCodesParams | (() => GetTaxCodesParams | undefined),
    ) =>
      httpResource<GetTaxCodesResponse>(() => ({
        url: `${base}/v1/tax_codes`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
