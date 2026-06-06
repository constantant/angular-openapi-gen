import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPromotionCodesParams =
  paths['/v1/promotion_codes']['get']['parameters']['query'];

export type GetPromotionCodesResponse =
  paths['/v1/promotion_codes']['get']['responses']['200']['content']['application/json'];

export const GET_PROMOTION_CODES = new InjectionToken<
  (
    params?:
      | GetPromotionCodesParams
      | (() => GetPromotionCodesParams | undefined),
  ) => ReturnType<typeof httpResource<GetPromotionCodesResponse>>
>('GET_PROMOTION_CODES');

export function provideGetPromotionCodes(): FactoryProvider {
  return {
    provide: GET_PROMOTION_CODES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetPromotionCodesParams
          | (() => GetPromotionCodesParams | undefined),
      ) =>
        httpResource<GetPromotionCodesResponse>(() => ({
          url: `${base}/v1/promotion_codes`,
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
