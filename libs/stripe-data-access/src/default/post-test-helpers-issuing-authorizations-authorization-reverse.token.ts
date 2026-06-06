import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingAuthorizationsAuthorizationReverseBody = NonNullable<
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/reverse']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingAuthorizationsAuthorizationReverseResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/reverse']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_REVERSE =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationReverseBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationReverseBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationReverseResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_REVERSE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostTestHelpersIssuingAuthorizationsAuthorizationReverseBody
          | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationReverseBody>,
      ) =>
        httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationReverseResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/reverse`,
            method: 'POST',
            body,
          }),
        );
    },
  });
