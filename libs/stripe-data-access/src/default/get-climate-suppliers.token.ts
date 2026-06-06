import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetClimateSuppliersParams =
  paths['/v1/climate/suppliers']['get']['parameters']['query'];

export type GetClimateSuppliersResponse =
  paths['/v1/climate/suppliers']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_SUPPLIERS = new InjectionToken<
  (
    params?:
      | GetClimateSuppliersParams
      | (() => GetClimateSuppliersParams | undefined),
  ) => ReturnType<typeof httpResource<GetClimateSuppliersResponse>>
>('GET_CLIMATE_SUPPLIERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetClimateSuppliersParams
        | (() => GetClimateSuppliersParams | undefined),
    ) =>
      httpResource<GetClimateSuppliersResponse>(() => ({
        url: `${base}/v1/climate/suppliers`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
