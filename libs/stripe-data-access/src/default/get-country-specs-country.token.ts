import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCountrySpecsCountryParams =
  paths['/v1/country_specs/{country}']['get']['parameters']['query'];

type GetCountrySpecsCountryResponse =
  paths['/v1/country_specs/{country}']['get']['responses']['200']['content']['application/json'];

export const GET_COUNTRY_SPECS_COUNTRY = new InjectionToken<
  (
    country: string,
    params?: GetCountrySpecsCountryParams,
  ) => ReturnType<typeof httpResource<GetCountrySpecsCountryResponse>>
>('GET_COUNTRY_SPECS_COUNTRY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (country: string, params?: GetCountrySpecsCountryParams) =>
      httpResource<GetCountrySpecsCountryResponse>(() => ({
        url: `${base}/v1/country_specs/${country}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
