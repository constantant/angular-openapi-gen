import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetShippingRatesShippingRateTokenParams =
  paths['/v1/shipping_rates/{shipping_rate_token}']['get']['parameters']['query'];

export type GetShippingRatesShippingRateTokenResponse =
  paths['/v1/shipping_rates/{shipping_rate_token}']['get']['responses']['200']['content']['application/json'];

export const GET_SHIPPING_RATES_SHIPPING_RATE_TOKEN = new InjectionToken<
  (
    shippingRateToken: string,
    params?:
      | GetShippingRatesShippingRateTokenParams
      | (() => GetShippingRatesShippingRateTokenParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetShippingRatesShippingRateTokenResponse>
  >
>('GET_SHIPPING_RATES_SHIPPING_RATE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      shippingRateToken: string,
      params?:
        | GetShippingRatesShippingRateTokenParams
        | (() => GetShippingRatesShippingRateTokenParams | undefined),
    ) =>
      httpResource<GetShippingRatesShippingRateTokenResponse>(() => ({
        url: `${base}/v1/shipping_rates/${shippingRateToken}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
