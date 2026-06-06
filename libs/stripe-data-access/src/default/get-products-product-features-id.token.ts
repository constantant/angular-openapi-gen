import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetProductsProductFeaturesIdParams =
  paths['/v1/products/{product}/features/{id}']['get']['parameters']['query'];

export type GetProductsProductFeaturesIdResponse =
  paths['/v1/products/{product}/features/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS_PRODUCT_FEATURES_ID = new InjectionToken<
  (
    id: string,
    product: string,
    params?:
      | GetProductsProductFeaturesIdParams
      | (() => GetProductsProductFeaturesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetProductsProductFeaturesIdResponse>>
>('GET_PRODUCTS_PRODUCT_FEATURES_ID');

export function provideGetProductsProductFeaturesId(): FactoryProvider {
  return {
    provide: GET_PRODUCTS_PRODUCT_FEATURES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        product: string,
        params?:
          | GetProductsProductFeaturesIdParams
          | (() => GetProductsProductFeaturesIdParams | undefined),
      ) =>
        httpResource<GetProductsProductFeaturesIdResponse>(() => ({
          url: `${base}/v1/products/${product}/features/${id}`,
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
