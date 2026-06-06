import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxAssociationsFindParams =
  paths['/v1/tax/associations/find']['get']['parameters']['query'];

export type GetTaxAssociationsFindResponse =
  paths['/v1/tax/associations/find']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_ASSOCIATIONS_FIND = new InjectionToken<
  (
    params?:
      | GetTaxAssociationsFindParams
      | (() => GetTaxAssociationsFindParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxAssociationsFindResponse>>
>('GET_TAX_ASSOCIATIONS_FIND');

export function provideGetTaxAssociationsFind(): FactoryProvider {
  return {
    provide: GET_TAX_ASSOCIATIONS_FIND,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTaxAssociationsFindParams
          | (() => GetTaxAssociationsFindParams | undefined),
      ) =>
        httpResource<GetTaxAssociationsFindResponse>(() => ({
          url: `${base}/v1/tax/associations/find`,
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
