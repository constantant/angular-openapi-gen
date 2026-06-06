import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIdentityVerificationSessionsParams =
  paths['/v1/identity/verification_sessions']['get']['parameters']['query'];

export type GetIdentityVerificationSessionsResponse =
  paths['/v1/identity/verification_sessions']['get']['responses']['200']['content']['application/json'];

export const GET_IDENTITY_VERIFICATION_SESSIONS = new InjectionToken<
  (
    params?:
      | GetIdentityVerificationSessionsParams
      | (() => GetIdentityVerificationSessionsParams | undefined),
  ) => ReturnType<typeof httpResource<GetIdentityVerificationSessionsResponse>>
>('GET_IDENTITY_VERIFICATION_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetIdentityVerificationSessionsParams
        | (() => GetIdentityVerificationSessionsParams | undefined),
    ) =>
      httpResource<GetIdentityVerificationSessionsResponse>(() => ({
        url: `${base}/v1/identity/verification_sessions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
