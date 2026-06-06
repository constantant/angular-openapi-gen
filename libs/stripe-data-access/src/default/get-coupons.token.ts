import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCouponsParams =
  paths['/v1/coupons']['get']['parameters']['query'];

export type GetCouponsResponse =
  paths['/v1/coupons']['get']['responses']['200']['content']['application/json'];

export const GET_COUPONS = new InjectionToken<
  (
    params?: GetCouponsParams | (() => GetCouponsParams | undefined),
  ) => ReturnType<typeof httpResource<GetCouponsResponse>>
>('GET_COUPONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCouponsParams | (() => GetCouponsParams | undefined)) =>
      httpResource<GetCouponsResponse>(() => ({
        url: `${base}/v1/coupons`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
