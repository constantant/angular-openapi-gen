import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTokensTokenParams =
  paths['/v1/tokens/{token}']['get']['parameters']['query'];

export type GetTokensTokenResponse =
  paths['/v1/tokens/{token}']['get']['responses']['200']['content']['application/json'];

export const GET_TOKENS_TOKEN = new InjectionToken<
  (
    token: string,
    params?: GetTokensTokenParams | (() => GetTokensTokenParams | undefined),
  ) => ReturnType<typeof httpResource<GetTokensTokenResponse>>
>('GET_TOKENS_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      token: string,
      params?: GetTokensTokenParams | (() => GetTokensTokenParams | undefined),
    ) =>
      httpResource<GetTokensTokenResponse>(() => ({
        url: `${base}/v1/tokens/${token}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
