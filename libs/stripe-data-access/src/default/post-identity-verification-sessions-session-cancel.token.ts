import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIdentityVerificationSessionsSessionCancelBody = NonNullable<
  paths['/v1/identity/verification_sessions/{session}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIdentityVerificationSessionsSessionCancelResponse =
  paths['/v1/identity/verification_sessions/{session}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_CANCEL =
  new InjectionToken<
    (
      session: string,
      body:
        | PostIdentityVerificationSessionsSessionCancelBody
        | Signal<PostIdentityVerificationSessionsSessionCancelBody>,
    ) => ReturnType<
      typeof httpResource<PostIdentityVerificationSessionsSessionCancelResponse>
    >
  >('POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_CANCEL');

export function providePostIdentityVerificationSessionsSessionCancel(): FactoryProvider {
  return {
    provide: POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        session: string,
        body:
          | PostIdentityVerificationSessionsSessionCancelBody
          | Signal<PostIdentityVerificationSessionsSessionCancelBody>,
      ) =>
        httpResource<PostIdentityVerificationSessionsSessionCancelResponse>(
          () => ({
            url: `${base}/v1/identity/verification_sessions/${session}/cancel`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
