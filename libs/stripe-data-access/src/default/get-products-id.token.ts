import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetProductsIdParams =
  paths['/v1/products/{id}']['get']['parameters']['query'];

export type GetProductsIdResponse =
  paths['/v1/products/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS_ID = new InjectionToken<
  (
    id: string,
    params?: GetProductsIdParams | (() => GetProductsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetProductsIdResponse>>
>('GET_PRODUCTS_ID');

export function provideGetProductsId(): FactoryProvider {
  return {
    provide: GET_PRODUCTS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?: GetProductsIdParams | (() => GetProductsIdParams | undefined),
      ) =>
        httpResource<GetProductsIdResponse>(() => ({
          url: `${base}/v1/products/${id}`,
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
