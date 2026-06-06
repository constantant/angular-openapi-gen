import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxCalculationsCalculationLineItemsParams =
  paths['/v1/tax/calculations/{calculation}/line_items']['get']['parameters']['query'];

type GetTaxCalculationsCalculationLineItemsResponse =
  paths['/v1/tax/calculations/{calculation}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CALCULATIONS_CALCULATION_LINE_ITEMS = new InjectionToken<
  (
    calculation: string,
    params?: GetTaxCalculationsCalculationLineItemsParams,
  ) => ReturnType<
    typeof httpResource<GetTaxCalculationsCalculationLineItemsResponse>
  >
>('GET_TAX_CALCULATIONS_CALCULATION_LINE_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      calculation: string,
      params?: GetTaxCalculationsCalculationLineItemsParams,
    ) =>
      httpResource<GetTaxCalculationsCalculationLineItemsResponse>(() => ({
        url: `${base}/v1/tax/calculations/${calculation}/line_items`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
