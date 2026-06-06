import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCouponsCouponParams =
  paths['/v1/coupons/{coupon}']['get']['parameters']['query'];

export type GetCouponsCouponResponse =
  paths['/v1/coupons/{coupon}']['get']['responses']['200']['content']['application/json'];

export const GET_COUPONS_COUPON = new InjectionToken<
  (
    coupon: string,
    params?:
      | GetCouponsCouponParams
      | (() => GetCouponsCouponParams | undefined),
  ) => ReturnType<typeof httpResource<GetCouponsCouponResponse>>
>('GET_COUPONS_COUPON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      coupon: string,
      params?:
        | GetCouponsCouponParams
        | (() => GetCouponsCouponParams | undefined),
    ) =>
      httpResource<GetCouponsCouponResponse>(() => ({
        url: `${base}/v1/coupons/${coupon}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
