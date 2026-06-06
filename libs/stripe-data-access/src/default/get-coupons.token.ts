import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCouponsParams = paths['/v1/coupons']['get']['parameters']['query'];

type GetCouponsResponse =
  paths['/v1/coupons']['get']['responses']['200']['content']['application/json'];

export const GET_COUPONS = new InjectionToken<
  (
    params?: GetCouponsParams,
  ) => ReturnType<typeof httpResource<GetCouponsResponse>>
>('GET_COUPONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCouponsParams) =>
      httpResource<GetCouponsResponse>(() => ({
        url: `${base}/v1/coupons`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
