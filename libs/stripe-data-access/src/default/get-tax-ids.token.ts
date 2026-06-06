import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxIdsParams =
  paths['/v1/tax_ids']['get']['parameters']['query'];

export type GetTaxIdsResponse =
  paths['/v1/tax_ids']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_IDS = new InjectionToken<
  (
    params?: GetTaxIdsParams | (() => GetTaxIdsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxIdsResponse>>
>('GET_TAX_IDS');

export function provideGetTaxIds(): FactoryProvider {
  return {
    provide: GET_TAX_IDS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (params?: GetTaxIdsParams | (() => GetTaxIdsParams | undefined)) =>
        httpResource<GetTaxIdsResponse>(() => ({
          url: `${base}/v1/tax_ids`,
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
