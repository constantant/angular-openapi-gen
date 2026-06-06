import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostProductsProductFeaturesBody = NonNullable<
  paths['/v1/products/{product}/features']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostProductsProductFeaturesResponse =
  paths['/v1/products/{product}/features']['post']['responses']['200']['content']['application/json'];

export const POST_PRODUCTS_PRODUCT_FEATURES = new InjectionToken<
  (
    product: string,
    body:
      | PostProductsProductFeaturesBody
      | Signal<PostProductsProductFeaturesBody>,
  ) => ReturnType<typeof httpResource<PostProductsProductFeaturesResponse>>
>('POST_PRODUCTS_PRODUCT_FEATURES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      product: string,
      body:
        | PostProductsProductFeaturesBody
        | Signal<PostProductsProductFeaturesBody>,
    ) =>
      httpResource<PostProductsProductFeaturesResponse>(() => ({
        url: `${base}/v1/products/${product}/features`,
        method: 'POST',
        body,
      }));
  },
});
