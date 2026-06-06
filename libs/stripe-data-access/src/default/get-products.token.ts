import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetProductsParams =
  paths['/v1/products']['get']['parameters']['query'];

export type GetProductsResponse =
  paths['/v1/products']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS = new InjectionToken<
  (
    params?: GetProductsParams | (() => GetProductsParams | undefined),
  ) => ReturnType<typeof httpResource<GetProductsResponse>>
>('GET_PRODUCTS');

export function provideGetProducts(): FactoryProvider {
  return {
    provide: GET_PRODUCTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetProductsParams | (() => GetProductsParams | undefined),
      ) =>
        httpResource<GetProductsResponse>(() => ({
          url: `${base}/v1/products`,
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
