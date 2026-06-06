import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingAuthorizationsAuthorizationCaptureBody = NonNullable<
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/capture']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingAuthorizationsAuthorizationCaptureResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/capture']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_CAPTURE =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationCaptureBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationCaptureBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationCaptureResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_CAPTURE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostTestHelpersIssuingAuthorizationsAuthorizationCaptureBody
          | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationCaptureBody>,
      ) =>
        httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationCaptureResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/capture`,
            method: 'POST',
            body,
          }),
        );
    },
  });
