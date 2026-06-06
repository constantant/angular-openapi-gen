import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostClimateOrdersOrderBody = NonNullable<
  paths['/v1/climate/orders/{order}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostClimateOrdersOrderResponse =
  paths['/v1/climate/orders/{order}']['post']['responses']['200']['content']['application/json'];

export const POST_CLIMATE_ORDERS_ORDER = new InjectionToken<
  (
    order: string,
    body: PostClimateOrdersOrderBody | Signal<PostClimateOrdersOrderBody>,
  ) => ReturnType<typeof httpResource<PostClimateOrdersOrderResponse>>
>('POST_CLIMATE_ORDERS_ORDER');

export function providePostClimateOrdersOrder(): FactoryProvider {
  return {
    provide: POST_CLIMATE_ORDERS_ORDER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        order: string,
        body: PostClimateOrdersOrderBody | Signal<PostClimateOrdersOrderBody>,
      ) =>
        httpResource<PostClimateOrdersOrderResponse>(() => ({
          url: `${base}/v1/climate/orders/${order}`,
          method: 'POST',
          body,
        }));
    },
  };
}
