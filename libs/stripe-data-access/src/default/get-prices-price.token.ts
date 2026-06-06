import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPricesPriceParams =
  paths['/v1/prices/{price}']['get']['parameters']['query'];

export type GetPricesPriceResponse =
  paths['/v1/prices/{price}']['get']['responses']['200']['content']['application/json'];

export const GET_PRICES_PRICE = new InjectionToken<
  (
    price: string,
    params?: GetPricesPriceParams | (() => GetPricesPriceParams | undefined),
  ) => ReturnType<typeof httpResource<GetPricesPriceResponse>>
>('GET_PRICES_PRICE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      price: string,
      params?: GetPricesPriceParams | (() => GetPricesPriceParams | undefined),
    ) =>
      httpResource<GetPricesPriceResponse>(() => ({
        url: `${base}/v1/prices/${price}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
