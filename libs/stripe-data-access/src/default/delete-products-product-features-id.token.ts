import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteProductsProductFeaturesIdBody = NonNullable<
  paths['/v1/products/{product}/features/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteProductsProductFeaturesIdResponse =
  paths['/v1/products/{product}/features/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_PRODUCTS_PRODUCT_FEATURES_ID = new InjectionToken<
  (
    id: string,
    product: string,
    body:
      | DeleteProductsProductFeaturesIdBody
      | Signal<DeleteProductsProductFeaturesIdBody>,
  ) => ReturnType<typeof httpResource<DeleteProductsProductFeaturesIdResponse>>
>('DELETE_PRODUCTS_PRODUCT_FEATURES_ID');

export function provideDeleteProductsProductFeaturesId(): FactoryProvider {
  return {
    provide: DELETE_PRODUCTS_PRODUCT_FEATURES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        product: string,
        body:
          | DeleteProductsProductFeaturesIdBody
          | Signal<DeleteProductsProductFeaturesIdBody>,
      ) =>
        httpResource<DeleteProductsProductFeaturesIdResponse>(() => ({
          url: `${base}/v1/products/${product}/features/${id}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
