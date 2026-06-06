import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostProductsBody = NonNullable<
  paths['/v1/products']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostProductsResponse =
  paths['/v1/products']['post']['responses']['200']['content']['application/json'];

export const POST_PRODUCTS = new InjectionToken<
  (
    body: PostProductsBody | Signal<PostProductsBody>,
  ) => ReturnType<typeof httpResource<PostProductsResponse>>
>('POST_PRODUCTS');

export function providePostProducts(): FactoryProvider {
  return {
    provide: POST_PRODUCTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostProductsBody | Signal<PostProductsBody>) =>
        httpResource<PostProductsResponse>(() => ({
          url: `${base}/v1/products`,
          method: 'POST',
          body,
        }));
    },
  };
}
