import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIdentityVerificationSessionsSessionParams =
  paths['/v1/identity/verification_sessions/{session}']['get']['parameters']['query'];

type GetIdentityVerificationSessionsSessionResponse =
  paths['/v1/identity/verification_sessions/{session}']['get']['responses']['200']['content']['application/json'];

export const GET_IDENTITY_VERIFICATION_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    params?: GetIdentityVerificationSessionsSessionParams,
  ) => ReturnType<
    typeof httpResource<GetIdentityVerificationSessionsSessionResponse>
  >
>('GET_IDENTITY_VERIFICATION_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      params?: GetIdentityVerificationSessionsSessionParams,
    ) =>
      httpResource<GetIdentityVerificationSessionsSessionResponse>(() => ({
        url: `${base}/v1/identity/verification_sessions/${session}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
