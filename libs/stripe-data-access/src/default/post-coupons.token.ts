import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCouponsBody = NonNullable<
  paths['/v1/coupons']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCouponsResponse =
  paths['/v1/coupons']['post']['responses']['200']['content']['application/json'];

export const POST_COUPONS = new InjectionToken<
  (
    body: PostCouponsBody | Signal<PostCouponsBody>,
  ) => ReturnType<typeof httpResource<PostCouponsResponse>>
>('POST_COUPONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostCouponsBody | Signal<PostCouponsBody>) =>
      httpResource<PostCouponsResponse>(() => ({
        url: `${base}/v1/coupons`,
        method: 'POST',
        body,
      }));
  },
});
