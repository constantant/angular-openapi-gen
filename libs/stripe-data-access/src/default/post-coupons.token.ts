import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCouponsBody = NonNullable<
  paths['/v1/coupons']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCouponsResponse =
  paths['/v1/coupons']['post']['responses']['200']['content']['application/json'];

export const POST_COUPONS = new InjectionToken<
  (
    body: PostCouponsBody | Signal<PostCouponsBody>,
  ) => ReturnType<typeof httpResource<PostCouponsResponse>>
>('POST_COUPONS');

export function providePostCoupons(): FactoryProvider {
  return {
    provide: POST_COUPONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostCouponsBody | Signal<PostCouponsBody>) =>
        httpResource<PostCouponsResponse>(() => ({
          url: `${base}/v1/coupons`,
          method: 'POST',
          body,
        }));
    },
  };
}
