import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPromotionCodesPromotionCodeBody = NonNullable<
  paths['/v1/promotion_codes/{promotion_code}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPromotionCodesPromotionCodeResponse =
  paths['/v1/promotion_codes/{promotion_code}']['post']['responses']['200']['content']['application/json'];

export const POST_PROMOTION_CODES_PROMOTION_CODE = new InjectionToken<
  (
    promotion_code: string,
    body:
      | PostPromotionCodesPromotionCodeBody
      | Signal<PostPromotionCodesPromotionCodeBody>,
  ) => ReturnType<typeof httpResource<PostPromotionCodesPromotionCodeResponse>>
>('POST_PROMOTION_CODES_PROMOTION_CODE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      promotion_code: string,
      body:
        | PostPromotionCodesPromotionCodeBody
        | Signal<PostPromotionCodesPromotionCodeBody>,
    ) =>
      httpResource<PostPromotionCodesPromotionCodeResponse>(() => ({
        url: `${base}/v1/promotion_codes/${promotion_code}`,
        method: 'POST',
        body,
      }));
  },
});
