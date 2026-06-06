import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSetupAttemptsParams =
  paths['/v1/setup_attempts']['get']['parameters']['query'];

export type GetSetupAttemptsResponse =
  paths['/v1/setup_attempts']['get']['responses']['200']['content']['application/json'];

export const GET_SETUP_ATTEMPTS = new InjectionToken<
  (
    params?:
      | GetSetupAttemptsParams
      | (() => GetSetupAttemptsParams | undefined),
  ) => ReturnType<typeof httpResource<GetSetupAttemptsResponse>>
>('GET_SETUP_ATTEMPTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetSetupAttemptsParams
        | (() => GetSetupAttemptsParams | undefined),
    ) =>
      httpResource<GetSetupAttemptsResponse>(() => ({
        url: `${base}/v1/setup_attempts`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
