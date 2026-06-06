import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostShippingRatesShippingRateTokenBody = NonNullable<
  paths['/v1/shipping_rates/{shipping_rate_token}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostShippingRatesShippingRateTokenResponse =
  paths['/v1/shipping_rates/{shipping_rate_token}']['post']['responses']['200']['content']['application/json'];

export const POST_SHIPPING_RATES_SHIPPING_RATE_TOKEN = new InjectionToken<
  (
    shipping_rate_token: string,
    body:
      | PostShippingRatesShippingRateTokenBody
      | Signal<PostShippingRatesShippingRateTokenBody>,
  ) => ReturnType<
    typeof httpResource<PostShippingRatesShippingRateTokenResponse>
  >
>('POST_SHIPPING_RATES_SHIPPING_RATE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      shipping_rate_token: string,
      body:
        | PostShippingRatesShippingRateTokenBody
        | Signal<PostShippingRatesShippingRateTokenBody>,
    ) =>
      httpResource<PostShippingRatesShippingRateTokenResponse>(() => ({
        url: `${base}/v1/shipping_rates/${shipping_rate_token}`,
        method: 'POST',
        body,
      }));
  },
});
