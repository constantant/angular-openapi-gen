import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingAuthorizationsAuthorizationDeclineBody = NonNullable<
  paths['/v1/issuing/authorizations/{authorization}/decline']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingAuthorizationsAuthorizationDeclineResponse =
  paths['/v1/issuing/authorizations/{authorization}/decline']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION_DECLINE =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostIssuingAuthorizationsAuthorizationDeclineBody
        | Signal<PostIssuingAuthorizationsAuthorizationDeclineBody>,
    ) => ReturnType<
      typeof httpResource<PostIssuingAuthorizationsAuthorizationDeclineResponse>
    >
  >('POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION_DECLINE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostIssuingAuthorizationsAuthorizationDeclineBody
          | Signal<PostIssuingAuthorizationsAuthorizationDeclineBody>,
      ) =>
        httpResource<PostIssuingAuthorizationsAuthorizationDeclineResponse>(
          () => ({
            url: `${base}/v1/issuing/authorizations/${authorization}/decline`,
            method: 'POST',
            body,
          }),
        );
    },
  });
