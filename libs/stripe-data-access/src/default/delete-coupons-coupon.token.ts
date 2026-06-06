import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCouponsCouponBody = NonNullable<
  paths['/v1/coupons/{coupon}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCouponsCouponResponse =
  paths['/v1/coupons/{coupon}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_COUPONS_COUPON = new InjectionToken<
  (
    coupon: string,
    body: DeleteCouponsCouponBody | Signal<DeleteCouponsCouponBody>,
  ) => ReturnType<typeof httpResource<DeleteCouponsCouponResponse>>
>('DELETE_COUPONS_COUPON');

export function provideDeleteCouponsCoupon(): FactoryProvider {
  return {
    provide: DELETE_COUPONS_COUPON,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        coupon: string,
        body: DeleteCouponsCouponBody | Signal<DeleteCouponsCouponBody>,
      ) =>
        httpResource<DeleteCouponsCouponResponse>(() => ({
          url: `${base}/v1/coupons/${coupon}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
