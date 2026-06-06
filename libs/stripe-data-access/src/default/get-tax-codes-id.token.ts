import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxCodesIdParams =
  paths['/v1/tax_codes/{id}']['get']['parameters']['query'];

export type GetTaxCodesIdResponse =
  paths['/v1/tax_codes/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_CODES_ID = new InjectionToken<
  (
    id: string,
    params?: GetTaxCodesIdParams | (() => GetTaxCodesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxCodesIdResponse>>
>('GET_TAX_CODES_ID');

export function provideGetTaxCodesId(): FactoryProvider {
  return {
    provide: GET_TAX_CODES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?: GetTaxCodesIdParams | (() => GetTaxCodesIdParams | undefined),
      ) =>
        httpResource<GetTaxCodesIdResponse>(() => ({
          url: `${base}/v1/tax_codes/${id}`,
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
