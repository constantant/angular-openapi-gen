import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPlansParams = paths['/v1/plans']['get']['parameters']['query'];

export type GetPlansResponse =
  paths['/v1/plans']['get']['responses']['200']['content']['application/json'];

export const GET_PLANS = new InjectionToken<
  (
    params?: GetPlansParams | (() => GetPlansParams | undefined),
  ) => ReturnType<typeof httpResource<GetPlansResponse>>
>('GET_PLANS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPlansParams | (() => GetPlansParams | undefined)) =>
      httpResource<GetPlansResponse>(() => ({
        url: `${base}/v1/plans`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
