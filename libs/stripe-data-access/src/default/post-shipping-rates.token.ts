import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostShippingRatesBody = NonNullable<
  paths['/v1/shipping_rates']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostShippingRatesResponse =
  paths['/v1/shipping_rates']['post']['responses']['200']['content']['application/json'];

export const POST_SHIPPING_RATES = new InjectionToken<
  (
    body: PostShippingRatesBody | Signal<PostShippingRatesBody>,
  ) => ReturnType<typeof httpResource<PostShippingRatesResponse>>
>('POST_SHIPPING_RATES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostShippingRatesBody | Signal<PostShippingRatesBody>) =>
      httpResource<PostShippingRatesResponse>(() => ({
        url: `${base}/v1/shipping_rates`,
        method: 'POST',
        body,
      }));
  },
});
