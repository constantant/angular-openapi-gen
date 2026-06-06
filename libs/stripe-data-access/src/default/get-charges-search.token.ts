import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetChargesSearchParams =
  paths['/v1/charges/search']['get']['parameters']['query'];

export type GetChargesSearchResponse =
  paths['/v1/charges/search']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_SEARCH = new InjectionToken<
  (
    params?:
      | GetChargesSearchParams
      | (() => GetChargesSearchParams | undefined),
  ) => ReturnType<typeof httpResource<GetChargesSearchResponse>>
>('GET_CHARGES_SEARCH');

export function provideGetChargesSearch(): FactoryProvider {
  return {
    provide: GET_CHARGES_SEARCH,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetChargesSearchParams
          | (() => GetChargesSearchParams | undefined),
      ) =>
        httpResource<GetChargesSearchResponse>(() => ({
          url: `${base}/v1/charges/search`,
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
