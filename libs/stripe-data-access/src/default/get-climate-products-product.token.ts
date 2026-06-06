import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetClimateProductsProductParams =
  paths['/v1/climate/products/{product}']['get']['parameters']['query'];

type GetClimateProductsProductResponse =
  paths['/v1/climate/products/{product}']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_PRODUCTS_PRODUCT = new InjectionToken<
  (
    product: string,
    params?: GetClimateProductsProductParams,
  ) => ReturnType<typeof httpResource<GetClimateProductsProductResponse>>
>('GET_CLIMATE_PRODUCTS_PRODUCT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (product: string, params?: GetClimateProductsProductParams) =>
      httpResource<GetClimateProductsProductResponse>(() => ({
        url: `${base}/v1/climate/products/${product}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
