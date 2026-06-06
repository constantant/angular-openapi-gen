import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxRatesParams = paths['/v1/tax_rates']['get']['parameters']['query'];

type GetTaxRatesResponse =
  paths['/v1/tax_rates']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_RATES = new InjectionToken<
  (
    params?: GetTaxRatesParams,
  ) => ReturnType<typeof httpResource<GetTaxRatesResponse>>
>('GET_TAX_RATES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTaxRatesParams) =>
      httpResource<GetTaxRatesResponse>(() => ({
        url: `${base}/v1/tax_rates`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
