import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCouponsCouponBody = NonNullable<
  paths['/v1/coupons/{coupon}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCouponsCouponResponse =
  paths['/v1/coupons/{coupon}']['post']['responses']['200']['content']['application/json'];

export const POST_COUPONS_COUPON = new InjectionToken<
  (
    coupon: string,
    body: PostCouponsCouponBody | Signal<PostCouponsCouponBody>,
  ) => ReturnType<typeof httpResource<PostCouponsCouponResponse>>
>('POST_COUPONS_COUPON');

export function providePostCouponsCoupon(): FactoryProvider {
  return {
    provide: POST_COUPONS_COUPON,
    useFactory: () => {
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
  };
}
