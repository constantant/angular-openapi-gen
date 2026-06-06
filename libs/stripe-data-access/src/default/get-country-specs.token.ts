import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCountrySpecsParams =
  paths['/v1/country_specs']['get']['parameters']['query'];

export type GetCountrySpecsResponse =
  paths['/v1/country_specs']['get']['responses']['200']['content']['application/json'];

export const GET_COUNTRY_SPECS = new InjectionToken<
  (
    params?: GetCountrySpecsParams | (() => GetCountrySpecsParams | undefined),
  ) => ReturnType<typeof httpResource<GetCountrySpecsResponse>>
>('GET_COUNTRY_SPECS');

export function provideGetCountrySpecs(): FactoryProvider {
  return {
    provide: GET_COUNTRY_SPECS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetCountrySpecsParams
          | (() => GetCountrySpecsParams | undefined),
      ) =>
        httpResource<GetCountrySpecsResponse>(() => ({
          url: `${base}/v1/country_specs`,
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
