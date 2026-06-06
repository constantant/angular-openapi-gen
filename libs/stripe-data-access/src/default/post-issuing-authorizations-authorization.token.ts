import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingAuthorizationsAuthorizationBody = NonNullable<
  paths['/v1/issuing/authorizations/{authorization}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingAuthorizationsAuthorizationResponse =
  paths['/v1/issuing/authorizations/{authorization}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION = new InjectionToken<
  (
    authorization: string,
    body:
      | PostIssuingAuthorizationsAuthorizationBody
      | Signal<PostIssuingAuthorizationsAuthorizationBody>,
  ) => ReturnType<
    typeof httpResource<PostIssuingAuthorizationsAuthorizationResponse>
  >
>('POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION');

export function providePostIssuingAuthorizationsAuthorization(): FactoryProvider {
  return {
    provide: POST_ISSUING_AUTHORIZATIONS_AUTHORIZATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        authorization: string,
        body:
          | PostIssuingAuthorizationsAuthorizationBody
          | Signal<PostIssuingAuthorizationsAuthorizationBody>,
      ) =>
        httpResource<PostIssuingAuthorizationsAuthorizationResponse>(() => ({
          url: `${base}/v1/issuing/authorizations/${authorization}`,
          method: 'POST',
          body,
        }));
    },
  };
}
