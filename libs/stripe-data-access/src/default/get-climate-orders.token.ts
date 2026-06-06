import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetClimateOrdersParams =
  paths['/v1/climate/orders']['get']['parameters']['query'];

type GetClimateOrdersResponse =
  paths['/v1/climate/orders']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_ORDERS = new InjectionToken<
  (
    params?: GetClimateOrdersParams,
  ) => ReturnType<typeof httpResource<GetClimateOrdersResponse>>
>('GET_CLIMATE_ORDERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetClimateOrdersParams) =>
      httpResource<GetClimateOrdersResponse>(() => ({
        url: `${base}/v1/climate/orders`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
