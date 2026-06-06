import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_FINALIZE_AMOUNT =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_FINALIZE_AMOUNT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountBody
          | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountBody>,
      ) =>
        httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/finalize_amount`,
            method: 'POST',
            body,
          }),
        );
    },
  });
