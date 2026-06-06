import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingAuthorizationsBody = NonNullable<
  paths['/v1/test_helpers/issuing/authorizations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingAuthorizationsResponse =
  paths['/v1/test_helpers/issuing/authorizations']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS = new InjectionToken<
  (
    body:
      | PostTestHelpersIssuingAuthorizationsBody
      | Signal<PostTestHelpersIssuingAuthorizationsBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersIssuingAuthorizationsResponse>
  >
>('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTestHelpersIssuingAuthorizationsBody
        | Signal<PostTestHelpersIssuingAuthorizationsBody>,
    ) =>
      httpResource<PostTestHelpersIssuingAuthorizationsResponse>(() => ({
        url: `${base}/v1/test_helpers/issuing/authorizations`,
        method: 'POST',
        body,
      }));
  },
});
