import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteProductsIdBody = NonNullable<
  paths['/v1/products/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteProductsIdResponse =
  paths['/v1/products/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_PRODUCTS_ID = new InjectionToken<
  (
    id: string,
    body: DeleteProductsIdBody | Signal<DeleteProductsIdBody>,
  ) => ReturnType<typeof httpResource<DeleteProductsIdResponse>>
>('DELETE_PRODUCTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body: DeleteProductsIdBody | Signal<DeleteProductsIdBody>,
    ) =>
      httpResource<DeleteProductsIdResponse>(() => ({
        url: `${base}/v1/products/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
