import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIdentityVerificationSessionsSessionParams =
  paths['/v1/identity/verification_sessions/{session}']['get']['parameters']['query'];

export type GetIdentityVerificationSessionsSessionResponse =
  paths['/v1/identity/verification_sessions/{session}']['get']['responses']['200']['content']['application/json'];

export const GET_IDENTITY_VERIFICATION_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    params?:
      | GetIdentityVerificationSessionsSessionParams
      | (() => GetIdentityVerificationSessionsSessionParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetIdentityVerificationSessionsSessionResponse>
  >
>('GET_IDENTITY_VERIFICATION_SESSIONS_SESSION');

export function provideGetIdentityVerificationSessionsSession(): FactoryProvider {
  return {
    provide: GET_IDENTITY_VERIFICATION_SESSIONS_SESSION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        session: string,
        params?:
          | GetIdentityVerificationSessionsSessionParams
          | (() => GetIdentityVerificationSessionsSessionParams | undefined),
      ) =>
        httpResource<GetIdentityVerificationSessionsSessionResponse>(() => ({
          url: `${base}/v1/identity/verification_sessions/${session}`,
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
