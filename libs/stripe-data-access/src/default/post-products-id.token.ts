import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostProductsIdBody = NonNullable<
  paths['/v1/products/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostProductsIdResponse =
  paths['/v1/products/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_PRODUCTS_ID = new InjectionToken<
  (
    id: string,
    body: PostProductsIdBody | Signal<PostProductsIdBody>,
  ) => ReturnType<typeof httpResource<PostProductsIdResponse>>
>('POST_PRODUCTS_ID');

export function providePostProductsId(): FactoryProvider {
  return {
    provide: POST_PRODUCTS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body: PostProductsIdBody | Signal<PostProductsIdBody>,
      ) =>
        httpResource<PostProductsIdResponse>(() => ({
          url: `${base}/v1/products/${id}`,
          method: 'POST',
          body,
        }));
    },
  };
}
