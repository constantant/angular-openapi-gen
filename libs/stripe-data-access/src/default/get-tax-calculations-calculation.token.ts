import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxCalculationsCalculationParams =
  paths['/v1/tax/calculations/{calculation}']['get']['parameters']['query'];

export type GetTaxCalculationsCalculationResponse =
  paths['/v1/tax/calculations/{calculation}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CALCULATIONS_CALCULATION = new InjectionToken<
  (
    calculation: string,
    params?:
      | GetTaxCalculationsCalculationParams
      | (() => GetTaxCalculationsCalculationParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxCalculationsCalculationResponse>>
>('GET_TAX_CALCULATIONS_CALCULATION');

export function provideGetTaxCalculationsCalculation(): FactoryProvider {
  return {
    provide: GET_TAX_CALCULATIONS_CALCULATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        calculation: string,
        params?:
          | GetTaxCalculationsCalculationParams
          | (() => GetTaxCalculationsCalculationParams | undefined),
      ) =>
        httpResource<GetTaxCalculationsCalculationResponse>(() => ({
          url: `${base}/v1/tax/calculations/${calculation}`,
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
