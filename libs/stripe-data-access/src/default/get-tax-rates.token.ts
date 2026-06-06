import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxRatesParams =
  paths['/v1/tax_rates']['get']['parameters']['query'];

export type GetTaxRatesResponse =
  paths['/v1/tax_rates']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_RATES = new InjectionToken<
  (
    params?: GetTaxRatesParams | (() => GetTaxRatesParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxRatesResponse>>
>('GET_TAX_RATES');

export function provideGetTaxRates(): FactoryProvider {
  return {
    provide: GET_TAX_RATES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetTaxRatesParams | (() => GetTaxRatesParams | undefined),
      ) =>
        httpResource<GetTaxRatesResponse>(() => ({
          url: `${base}/v1/tax_rates`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
