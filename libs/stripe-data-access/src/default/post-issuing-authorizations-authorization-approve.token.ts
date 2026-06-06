import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostIssuingAuthorizationsAuthorizationApproveBody = NonNullable<
  paths['/v1/issuing/authorizations/{authorization}/approve']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostIssuingAuthorizationsAuthorizationApproveResponse =
  paths['/v1/issuing/authorizations/{authorization}/approve']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION_APPROVE =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostIssuingAuthorizationsAuthorizationApproveBody
        | Signal<PostIssuingAuthorizationsAuthorizationApproveBody>,
    ) => ReturnType<
      typeof httpResource<PostIssuingAuthorizationsAuthorizationApproveResponse>
    >
  >('POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION_APPROVE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostIssuingAuthorizationsAuthorizationApproveBody
          | Signal<PostIssuingAuthorizationsAuthorizationApproveBody>,
      ) =>
        httpResource<PostIssuingAuthorizationsAuthorizationApproveResponse>(
          () => ({
            url: `${base}/v1/issuing/authorizations/${authorization}/approve`,
            method: 'POST',
            body,
          }),
        );
    },
  });
