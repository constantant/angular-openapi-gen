import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetProductsParams = paths['/v1/products']['get']['parameters']['query'];

type GetProductsResponse =
  paths['/v1/products']['get']['responses']['200']['content']['application/json'];

export const GET_PRODUCTS = new InjectionToken<
  (
    params?: GetProductsParams,
  ) => ReturnType<typeof httpResource<GetProductsResponse>>
>('GET_PRODUCTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetProductsParams) =>
      httpResource<GetProductsResponse>(() => ({
        url: `${base}/v1/products`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
