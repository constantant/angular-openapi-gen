import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostClimateOrdersBody = NonNullable<
  paths['/v1/climate/orders']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostClimateOrdersResponse =
  paths['/v1/climate/orders']['post']['responses']['200']['content']['application/json'];

export const POST_CLIMATE_ORDERS = new InjectionToken<
  (
    body: PostClimateOrdersBody | Signal<PostClimateOrdersBody>,
  ) => ReturnType<typeof httpResource<PostClimateOrdersResponse>>
>('POST_CLIMATE_ORDERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostClimateOrdersBody | Signal<PostClimateOrdersBody>) =>
      httpResource<PostClimateOrdersResponse>(() => ({
        url: `${base}/v1/climate/orders`,
        method: 'POST',
        body,
      }));
  },
});
