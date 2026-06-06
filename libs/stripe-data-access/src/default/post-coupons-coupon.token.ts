import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCouponsCouponBody = NonNullable<
  paths['/v1/coupons/{coupon}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCouponsCouponResponse =
  paths['/v1/coupons/{coupon}']['post']['responses']['200']['content']['application/json'];

export const POST_COUPONS_COUPON = new InjectionToken<
  (
    coupon: string,
    body: PostCouponsCouponBody | Signal<PostCouponsCouponBody>,
  ) => ReturnType<typeof httpResource<PostCouponsCouponResponse>>
>('POST_COUPONS_COUPON', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      coupon: string,
      body: PostCouponsCouponBody | Signal<PostCouponsCouponBody>,
    ) =>
      httpResource<PostCouponsCouponResponse>(() => ({
        url: `${base}/v1/coupons/${coupon}`,
        method: 'POST',
        body,
      }));
  },
});
