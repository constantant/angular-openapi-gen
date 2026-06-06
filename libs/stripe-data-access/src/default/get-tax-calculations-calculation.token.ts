import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxCalculationsCalculationParams =
  paths['/v1/tax/calculations/{calculation}']['get']['parameters']['query'];

type GetTaxCalculationsCalculationResponse =
  paths['/v1/tax/calculations/{calculation}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CALCULATIONS_CALCULATION = new InjectionToken<
  (
    calculation: string,
    params?: GetTaxCalculationsCalculationParams,
  ) => ReturnType<typeof httpResource<GetTaxCalculationsCalculationResponse>>
>('GET_TAX_CALCULATIONS_CALCULATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      calculation: string,
      params?: GetTaxCalculationsCalculationParams,
    ) =>
      httpResource<GetTaxCalculationsCalculationResponse>(() => ({
        url: `${base}/v1/tax/calculations/${calculation}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
