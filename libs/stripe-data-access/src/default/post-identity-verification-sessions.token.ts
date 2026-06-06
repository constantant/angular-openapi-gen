import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIdentityVerificationSessionsBody = NonNullable<
  paths['/v1/identity/verification_sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIdentityVerificationSessionsResponse =
  paths['/v1/identity/verification_sessions']['post']['responses']['200']['content']['application/json'];

export const POST_IDENTITY_VERIFICATION_SESSIONS = new InjectionToken<
  (
    body:
      | PostIdentityVerificationSessionsBody
      | Signal<PostIdentityVerificationSessionsBody>,
  ) => ReturnType<typeof httpResource<PostIdentityVerificationSessionsResponse>>
>('POST_IDENTITY_VERIFICATION_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostIdentityVerificationSessionsBody
        | Signal<PostIdentityVerificationSessionsBody>,
    ) =>
      httpResource<PostIdentityVerificationSessionsResponse>(() => ({
        url: `${base}/v1/identity/verification_sessions`,
        method: 'POST',
        body,
      }));
  },
});
