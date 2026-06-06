import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetShippingRatesShippingRateTokenParams =
  paths['/v1/shipping_rates/{shipping_rate_token}']['get']['parameters']['query'];

type GetShippingRatesShippingRateTokenResponse =
  paths['/v1/shipping_rates/{shipping_rate_token}']['get']['responses']['200']['content']['application/json'];

export const GET_SHIPPING_RATES_SHIPPING_RATE_TOKEN = new InjectionToken<
  (
    shipping_rate_token: string,
    params?: GetShippingRatesShippingRateTokenParams,
  ) => ReturnType<
    typeof httpResource<GetShippingRatesShippingRateTokenResponse>
  >
>('GET_SHIPPING_RATES_SHIPPING_RATE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      shipping_rate_token: string,
      params?: GetShippingRatesShippingRateTokenParams,
    ) =>
      httpResource<GetShippingRatesShippingRateTokenResponse>(() => ({
        url: `${base}/v1/shipping_rates/${shipping_rate_token}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
