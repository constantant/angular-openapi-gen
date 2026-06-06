import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostClimateOrdersOrderCancelBody = NonNullable<
  paths['/v1/climate/orders/{order}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostClimateOrdersOrderCancelResponse =
  paths['/v1/climate/orders/{order}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_CLIMATE_ORDERS_ORDER_CANCEL = new InjectionToken<
  (
    order: string,
    body:
      | PostClimateOrdersOrderCancelBody
      | Signal<PostClimateOrdersOrderCancelBody>,
  ) => ReturnType<typeof httpResource<PostClimateOrdersOrderCancelResponse>>
>('POST_CLIMATE_ORDERS_ORDER_CANCEL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      order: string,
      body:
        | PostClimateOrdersOrderCancelBody
        | Signal<PostClimateOrdersOrderCancelBody>,
    ) =>
      httpResource<PostClimateOrdersOrderCancelResponse>(() => ({
        url: `${base}/v1/climate/orders/${order}/cancel`,
        method: 'POST',
        body,
      }));
  },
});
