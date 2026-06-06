import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRefundsParams =
  paths['/v1/refunds']['get']['parameters']['query'];

export type GetRefundsResponse =
  paths['/v1/refunds']['get']['responses']['200']['content']['application/json'];

export const GET_REFUNDS = new InjectionToken<
  (
    params?: GetRefundsParams | (() => GetRefundsParams | undefined),
  ) => ReturnType<typeof httpResource<GetRefundsResponse>>
>('GET_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetRefundsParams | (() => GetRefundsParams | undefined)) =>
      httpResource<GetRefundsResponse>(() => ({
        url: `${base}/v1/refunds`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
