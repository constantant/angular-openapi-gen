import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPricesParams = paths['/v1/prices']['get']['parameters']['query'];

export type GetPricesResponse =
  paths['/v1/prices']['get']['responses']['200']['content']['application/json'];

export const GET_PRICES = new InjectionToken<
  (
    params?: GetPricesParams | (() => GetPricesParams | undefined),
  ) => ReturnType<typeof httpResource<GetPricesResponse>>
>('GET_PRICES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPricesParams | (() => GetPricesParams | undefined)) =>
      httpResource<GetPricesResponse>(() => ({
        url: `${base}/v1/prices`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
