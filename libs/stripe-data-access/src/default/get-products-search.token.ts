import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetProductsSearchParams =
  paths['/v1/products/search']['get']['parameters']['query'];

export type GetProductsSearchResponse =
  paths['/v1/products/search']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS_SEARCH = new InjectionToken<
  (
    params?:
      | GetProductsSearchParams
      | (() => GetProductsSearchParams | undefined),
  ) => ReturnType<typeof httpResource<GetProductsSearchResponse>>
>('GET_PRODUCTS_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetProductsSearchParams
        | (() => GetProductsSearchParams | undefined),
    ) =>
      httpResource<GetProductsSearchResponse>(() => ({
        url: `${base}/v1/products/search`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
