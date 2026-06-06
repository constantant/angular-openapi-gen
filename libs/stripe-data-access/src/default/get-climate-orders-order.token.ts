import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetClimateOrdersOrderParams =
  paths['/v1/climate/orders/{order}']['get']['parameters']['query'];

export type GetClimateOrdersOrderResponse =
  paths['/v1/climate/orders/{order}']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_ORDERS_ORDER = new InjectionToken<
  (
    order: string,
    params?:
      | GetClimateOrdersOrderParams
      | (() => GetClimateOrdersOrderParams | undefined),
  ) => ReturnType<typeof httpResource<GetClimateOrdersOrderResponse>>
>('GET_CLIMATE_ORDERS_ORDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      order: string,
      params?:
        | GetClimateOrdersOrderParams
        | (() => GetClimateOrdersOrderParams | undefined),
    ) =>
      httpResource<GetClimateOrdersOrderResponse>(() => ({
        url: `${base}/v1/climate/orders/${order}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
