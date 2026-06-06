import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetChargesParams =
  paths['/v1/charges']['get']['parameters']['query'];

export type GetChargesResponse =
  paths['/v1/charges']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES = new InjectionToken<
  (
    params?: GetChargesParams | (() => GetChargesParams | undefined),
  ) => ReturnType<typeof httpResource<GetChargesResponse>>
>('GET_CHARGES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetChargesParams | (() => GetChargesParams | undefined)) =>
      httpResource<GetChargesResponse>(() => ({
        url: `${base}/v1/charges`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
