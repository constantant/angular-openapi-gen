import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetProductsProductFeaturesParams =
  paths['/v1/products/{product}/features']['get']['parameters']['query'];

type GetProductsProductFeaturesResponse =
  paths['/v1/products/{product}/features']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS_PRODUCT_FEATURES = new InjectionToken<
  (
    product: string,
    params?: GetProductsProductFeaturesParams,
  ) => ReturnType<typeof httpResource<GetProductsProductFeaturesResponse>>
>('GET_PRODUCTS_PRODUCT_FEATURES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (product: string, params?: GetProductsProductFeaturesParams) =>
      httpResource<GetProductsProductFeaturesResponse>(() => ({
        url: `${base}/v1/products/${product}/features`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
