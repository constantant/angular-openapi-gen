import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingAuthorizationsAuthorizationParams =
  paths['/v1/issuing/authorizations/{authorization}']['get']['parameters']['query'];

export type GetIssuingAuthorizationsAuthorizationResponse =
  paths['/v1/issuing/authorizations/{authorization}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_AUTHORIZATIONS_AUTHORIZATION = new InjectionToken<
  (
    authorization: string,
    params?:
      | GetIssuingAuthorizationsAuthorizationParams
      | (() => GetIssuingAuthorizationsAuthorizationParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetIssuingAuthorizationsAuthorizationResponse>
  >
>('GET_ISSUING_AUTHORIZATIONS_AUTHORIZATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      authorization: string,
      params?:
        | GetIssuingAuthorizationsAuthorizationParams
        | (() => GetIssuingAuthorizationsAuthorizationParams | undefined),
    ) =>
      httpResource<GetIssuingAuthorizationsAuthorizationResponse>(() => ({
        url: `${base}/v1/issuing/authorizations/${authorization}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
