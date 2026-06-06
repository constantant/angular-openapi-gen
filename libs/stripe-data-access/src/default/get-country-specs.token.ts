import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCountrySpecsParams =
  paths['/v1/country_specs']['get']['parameters']['query'];

type GetCountrySpecsResponse =
  paths['/v1/country_specs']['get']['responses']['200']['content']['application/json'];

export const GET_COUNTRY_SPECS = new InjectionToken<
  (
    params?: GetCountrySpecsParams,
  ) => ReturnType<typeof httpResource<GetCountrySpecsResponse>>
>('GET_COUNTRY_SPECS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCountrySpecsParams) =>
      httpResource<GetCountrySpecsResponse>(() => ({
        url: `${base}/v1/country_specs`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
