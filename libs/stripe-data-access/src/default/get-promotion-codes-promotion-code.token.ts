import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPromotionCodesPromotionCodeParams =
  paths['/v1/promotion_codes/{promotion_code}']['get']['parameters']['query'];

export type GetPromotionCodesPromotionCodeResponse =
  paths['/v1/promotion_codes/{promotion_code}']['get']['responses']['200']['content']['application/json'];

export const GET_PROMOTION_CODES_PROMOTION_CODE = new InjectionToken<
  (
    promotionCode: string,
    params?:
      | GetPromotionCodesPromotionCodeParams
      | (() => GetPromotionCodesPromotionCodeParams | undefined),
  ) => ReturnType<typeof httpResource<GetPromotionCodesPromotionCodeResponse>>
>('GET_PROMOTION_CODES_PROMOTION_CODE');

export function provideGetPromotionCodesPromotionCode(): FactoryProvider {
  return {
    provide: GET_PROMOTION_CODES_PROMOTION_CODE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        promotionCode: string,
        params?:
          | GetPromotionCodesPromotionCodeParams
          | (() => GetPromotionCodesPromotionCodeParams | undefined),
      ) =>
        httpResource<GetPromotionCodesPromotionCodeResponse>(() => ({
          url: `${base}/v1/promotion_codes/${promotionCode}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
