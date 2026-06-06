import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxIdsIdParams =
  paths['/v1/tax_ids/{id}']['get']['parameters']['query'];

export type GetTaxIdsIdResponse =
  paths['/v1/tax_ids/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_IDS_ID = new InjectionToken<
  (
    id: string,
    params?: GetTaxIdsIdParams | (() => GetTaxIdsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxIdsIdResponse>>
>('GET_TAX_IDS_ID');

export function provideGetTaxIdsId(): FactoryProvider {
  return {
    provide: GET_TAX_IDS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?: GetTaxIdsIdParams | (() => GetTaxIdsIdParams | undefined),
      ) =>
        httpResource<GetTaxIdsIdResponse>(() => ({
          url: `${base}/v1/tax_ids/${id}`,
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
