import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetClimateOrdersOrderParams =
  paths['/v1/climate/orders/{order}']['get']['parameters']['query'];

type GetClimateOrdersOrderResponse =
  paths['/v1/climate/orders/{order}']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_ORDERS_ORDER = new InjectionToken<
  (
    order: string,
    params?: GetClimateOrdersOrderParams,
  ) => ReturnType<typeof httpResource<GetClimateOrdersOrderResponse>>
>('GET_CLIMATE_ORDERS_ORDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (order: string, params?: GetClimateOrdersOrderParams) =>
      httpResource<GetClimateOrdersOrderResponse>(() => ({
        url: `${base}/v1/climate/orders/${order}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
