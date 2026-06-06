import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxRatesTaxRateParams =
  paths['/v1/tax_rates/{tax_rate}']['get']['parameters']['query'];

type GetTaxRatesTaxRateResponse =
  paths['/v1/tax_rates/{tax_rate}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_RATES_TAX_RATE = new InjectionToken<
  (
    tax_rate: string,
    params?: GetTaxRatesTaxRateParams,
  ) => ReturnType<typeof httpResource<GetTaxRatesTaxRateResponse>>
>('GET_TAX_RATES_TAX_RATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (tax_rate: string, params?: GetTaxRatesTaxRateParams) =>
      httpResource<GetTaxRatesTaxRateResponse>(() => ({
        url: `${base}/v1/tax_rates/${tax_rate}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
