import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetClimateProductsParams =
  paths['/v1/climate/products']['get']['parameters']['query'];

export type GetClimateProductsResponse =
  paths['/v1/climate/products']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_PRODUCTS = new InjectionToken<
  (
    params?:
      | GetClimateProductsParams
      | (() => GetClimateProductsParams | undefined),
  ) => ReturnType<typeof httpResource<GetClimateProductsResponse>>
>('GET_CLIMATE_PRODUCTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetClimateProductsParams
        | (() => GetClimateProductsParams | undefined),
    ) =>
      httpResource<GetClimateProductsResponse>(() => ({
        url: `${base}/v1/climate/products`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
