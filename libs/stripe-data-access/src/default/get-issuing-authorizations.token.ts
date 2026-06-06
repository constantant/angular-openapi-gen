import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingAuthorizationsParams =
  paths['/v1/issuing/authorizations']['get']['parameters']['query'];

export type GetIssuingAuthorizationsResponse =
  paths['/v1/issuing/authorizations']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_AUTHORIZATIONS = new InjectionToken<
  (
    params?:
      | GetIssuingAuthorizationsParams
      | (() => GetIssuingAuthorizationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingAuthorizationsResponse>>
>('GET_ISSUING_AUTHORIZATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetIssuingAuthorizationsParams
        | (() => GetIssuingAuthorizationsParams | undefined),
    ) =>
      httpResource<GetIssuingAuthorizationsResponse>(() => ({
        url: `${base}/v1/issuing/authorizations`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
