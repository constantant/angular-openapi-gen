import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostIdentityVerificationSessionsSessionBody = NonNullable<
  paths['/v1/identity/verification_sessions/{session}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostIdentityVerificationSessionsSessionResponse =
  paths['/v1/identity/verification_sessions/{session}']['post']['responses']['200']['content']['application/json'];

export const POST_IDENTITY_VERIFICATION_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    body:
      | PostIdentityVerificationSessionsSessionBody
      | Signal<PostIdentityVerificationSessionsSessionBody>,
  ) => ReturnType<
    typeof httpResource<PostIdentityVerificationSessionsSessionResponse>
  >
>('POST_IDENTITY_VERIFICATION_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      body:
        | PostIdentityVerificationSessionsSessionBody
        | Signal<PostIdentityVerificationSessionsSessionBody>,
    ) =>
      httpResource<PostIdentityVerificationSessionsSessionResponse>(() => ({
        url: `${base}/v1/identity/verification_sessions/${session}`,
        method: 'POST',
        body,
      }));
  },
});
