import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingAuthorizationsAuthorizationExpireBody = NonNullable<
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/expire']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingAuthorizationsAuthorizationExpireResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/expire']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_EXPIRE =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationExpireBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationExpireBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationExpireResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_EXPIRE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostTestHelpersIssuingAuthorizationsAuthorizationExpireBody
          | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationExpireBody>,
      ) =>
        httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationExpireResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/expire`,
            method: 'POST',
            body,
          }),
        );
    },
  });
