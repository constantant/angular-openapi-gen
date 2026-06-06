import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPromotionCodesPromotionCodeParams =
  paths['/v1/promotion_codes/{promotion_code}']['get']['parameters']['query'];

type GetPromotionCodesPromotionCodeResponse =
  paths['/v1/promotion_codes/{promotion_code}']['get']['responses']['200']['content']['application/json'];

export const GET_PROMOTION_CODES_PROMOTION_CODE = new InjectionToken<
  (
    promotion_code: string,
    params?: GetPromotionCodesPromotionCodeParams,
  ) => ReturnType<typeof httpResource<GetPromotionCodesPromotionCodeResponse>>
>('GET_PROMOTION_CODES_PROMOTION_CODE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      promotion_code: string,
      params?: GetPromotionCodesPromotionCodeParams,
    ) =>
      httpResource<GetPromotionCodesPromotionCodeResponse>(() => ({
        url: `${base}/v1/promotion_codes/${promotion_code}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
