import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingTokensParams =
  paths['/v1/issuing/tokens']['get']['parameters']['query'];

export type GetIssuingTokensResponse =
  paths['/v1/issuing/tokens']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_TOKENS = new InjectionToken<
  (
    params?:
      | GetIssuingTokensParams
      | (() => GetIssuingTokensParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingTokensResponse>>
>('GET_ISSUING_TOKENS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetIssuingTokensParams
        | (() => GetIssuingTokensParams | undefined),
    ) =>
      httpResource<GetIssuingTokensResponse>(() => ({
        url: `${base}/v1/issuing/tokens`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
