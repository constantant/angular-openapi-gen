import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxRatesTaxRateParams =
  paths['/v1/tax_rates/{tax_rate}']['get']['parameters']['query'];

export type GetTaxRatesTaxRateResponse =
  paths['/v1/tax_rates/{tax_rate}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_RATES_TAX_RATE = new InjectionToken<
  (
    taxRate: string,
    params?:
      | GetTaxRatesTaxRateParams
      | (() => GetTaxRatesTaxRateParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxRatesTaxRateResponse>>
>('GET_TAX_RATES_TAX_RATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      taxRate: string,
      params?:
        | GetTaxRatesTaxRateParams
        | (() => GetTaxRatesTaxRateParams | undefined),
    ) =>
      httpResource<GetTaxRatesTaxRateResponse>(() => ({
        url: `${base}/v1/tax_rates/${taxRate}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
