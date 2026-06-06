import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPromotionCodesBody = NonNullable<
  paths['/v1/promotion_codes']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPromotionCodesResponse =
  paths['/v1/promotion_codes']['post']['responses']['200']['content']['application/json'];

export const POST_PROMOTION_CODES = new InjectionToken<
  (
    body: PostPromotionCodesBody | Signal<PostPromotionCodesBody>,
  ) => ReturnType<typeof httpResource<PostPromotionCodesResponse>>
>('POST_PROMOTION_CODES');

export function providePostPromotionCodes(): FactoryProvider {
  return {
    provide: POST_PROMOTION_CODES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostPromotionCodesBody | Signal<PostPromotionCodesBody>) =>
        httpResource<PostPromotionCodesResponse>(() => ({
          url: `${base}/v1/promotion_codes`,
          method: 'POST',
          body,
        }));
    },
  };
}
