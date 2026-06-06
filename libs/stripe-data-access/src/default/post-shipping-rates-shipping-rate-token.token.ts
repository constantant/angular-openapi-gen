import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostShippingRatesShippingRateTokenBody = NonNullable<
  paths['/v1/shipping_rates/{shipping_rate_token}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostShippingRatesShippingRateTokenResponse =
  paths['/v1/shipping_rates/{shipping_rate_token}']['post']['responses']['200']['content']['application/json'];

export const POST_SHIPPING_RATES_SHIPPING_RATE_TOKEN = new InjectionToken<
  (
    shippingRateToken: string,
    body:
      | PostShippingRatesShippingRateTokenBody
      | Signal<PostShippingRatesShippingRateTokenBody>,
  ) => ReturnType<
    typeof httpResource<PostShippingRatesShippingRateTokenResponse>
  >
>('POST_SHIPPING_RATES_SHIPPING_RATE_TOKEN');

export function providePostShippingRatesShippingRateToken(): FactoryProvider {
  return {
    provide: POST_SHIPPING_RATES_SHIPPING_RATE_TOKEN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        shippingRateToken: string,
        body:
          | PostShippingRatesShippingRateTokenBody
          | Signal<PostShippingRatesShippingRateTokenBody>,
      ) =>
        httpResource<PostShippingRatesShippingRateTokenResponse>(() => ({
          url: `${base}/v1/shipping_rates/${shippingRateToken}`,
          method: 'POST',
          body,
        }));
    },
  };
}
