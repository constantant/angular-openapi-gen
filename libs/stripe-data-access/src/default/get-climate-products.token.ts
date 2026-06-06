import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetClimateProductsParams =
  paths['/v1/climate/products']['get']['parameters']['query'];

type GetClimateProductsResponse =
  paths['/v1/climate/products']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_PRODUCTS = new InjectionToken<
  (
    params?: GetClimateProductsParams,
  ) => ReturnType<typeof httpResource<GetClimateProductsResponse>>
>('GET_CLIMATE_PRODUCTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetClimateProductsParams) =>
      httpResource<GetClimateProductsResponse>(() => ({
        url: `${base}/v1/climate/products`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
