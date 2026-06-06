import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIdentityVerificationSessionsSessionRedactBody = NonNullable<
  paths['/v1/identity/verification_sessions/{session}/redact']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIdentityVerificationSessionsSessionRedactResponse =
  paths['/v1/identity/verification_sessions/{session}/redact']['post']['responses']['200']['content']['application/json'];

export const POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_REDACT =
  new InjectionToken<
    (
      session: string,
      body:
        | PostIdentityVerificationSessionsSessionRedactBody
        | Signal<PostIdentityVerificationSessionsSessionRedactBody>,
    ) => ReturnType<
      typeof httpResource<PostIdentityVerificationSessionsSessionRedactResponse>
    >
  >('POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_REDACT');

export function providePostIdentityVerificationSessionsSessionRedact(): FactoryProvider {
  return {
    provide: POST_IDENTITY_VERIFICATION_SESSIONS_SESSION_REDACT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        session: string,
        body:
          | PostIdentityVerificationSessionsSessionRedactBody
          | Signal<PostIdentityVerificationSessionsSessionRedactBody>,
      ) =>
        httpResource<PostIdentityVerificationSessionsSessionRedactResponse>(
          () => ({
            url: `${base}/v1/identity/verification_sessions/${session}/redact`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
