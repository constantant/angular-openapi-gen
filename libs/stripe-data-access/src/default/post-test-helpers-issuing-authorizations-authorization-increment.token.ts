import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/authorizations/{authorization}/increment']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/increment']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_INCREMENT =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationIncrementBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_INCREMENT');

export function providePostTestHelpersIssuingAuthorizationsAuthorizationIncrement(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_INCREMENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostTestHelpersIssuingAuthorizationsAuthorizationIncrementBody
          | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementBody>,
      ) =>
        httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/increment`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
