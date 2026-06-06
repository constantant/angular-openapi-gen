import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPromotionCodesParams =
  paths['/v1/promotion_codes']['get']['parameters']['query'];

type GetPromotionCodesResponse =
  paths['/v1/promotion_codes']['get']['responses']['200']['content']['application/json'];

export const GET_PROMOTION_CODES = new InjectionToken<
  (
    params?: GetPromotionCodesParams,
  ) => ReturnType<typeof httpResource<GetPromotionCodesResponse>>
>('GET_PROMOTION_CODES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPromotionCodesParams) =>
      httpResource<GetPromotionCodesResponse>(() => ({
        url: `${base}/v1/promotion_codes`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
