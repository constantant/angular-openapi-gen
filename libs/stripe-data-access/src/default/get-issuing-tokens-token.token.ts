import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingTokensTokenParams =
  paths['/v1/issuing/tokens/{token}']['get']['parameters']['query'];

export type GetIssuingTokensTokenResponse =
  paths['/v1/issuing/tokens/{token}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_TOKENS_TOKEN = new InjectionToken<
  (
    token: string,
    params?:
      | GetIssuingTokensTokenParams
      | (() => GetIssuingTokensTokenParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingTokensTokenResponse>>
>('GET_ISSUING_TOKENS_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      token: string,
      params?:
        | GetIssuingTokensTokenParams
        | (() => GetIssuingTokensTokenParams | undefined),
    ) =>
      httpResource<GetIssuingTokensTokenResponse>(() => ({
        url: `${base}/v1/issuing/tokens/${token}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
