import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPricesPriceParams =
  paths['/v1/prices/{price}']['get']['parameters']['query'];

type GetPricesPriceResponse =
  paths['/v1/prices/{price}']['get']['responses']['200']['content']['application/json'];

export const GET_PRICES_PRICE = new InjectionToken<
  (
    price: string,
    params?: GetPricesPriceParams,
  ) => ReturnType<typeof httpResource<GetPricesPriceResponse>>
>('GET_PRICES_PRICE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (price: string, params?: GetPricesPriceParams) =>
      httpResource<GetPricesPriceResponse>(() => ({
        url: `${base}/v1/prices/${price}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
