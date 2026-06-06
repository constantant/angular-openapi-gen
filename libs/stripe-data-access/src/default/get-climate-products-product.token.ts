import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetClimateProductsProductParams =
  paths['/v1/climate/products/{product}']['get']['parameters']['query'];

export type GetClimateProductsProductResponse =
  paths['/v1/climate/products/{product}']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_PRODUCTS_PRODUCT = new InjectionToken<
  (
    product: string,
    params?:
      | GetClimateProductsProductParams
      | (() => GetClimateProductsProductParams | undefined),
  ) => ReturnType<typeof httpResource<GetClimateProductsProductResponse>>
>('GET_CLIMATE_PRODUCTS_PRODUCT');

export function provideGetClimateProductsProduct(): FactoryProvider {
  return {
    provide: GET_CLIMATE_PRODUCTS_PRODUCT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        product: string,
        params?:
          | GetClimateProductsProductParams
          | (() => GetClimateProductsProductParams | undefined),
      ) =>
        httpResource<GetClimateProductsProductResponse>(() => ({
          url: `${base}/v1/climate/products/${product}`,
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
