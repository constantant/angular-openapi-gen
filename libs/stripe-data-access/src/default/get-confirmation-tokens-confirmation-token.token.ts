import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetConfirmationTokensConfirmationTokenParams =
  paths['/v1/confirmation_tokens/{confirmation_token}']['get']['parameters']['query'];

export type GetConfirmationTokensConfirmationTokenResponse =
  paths['/v1/confirmation_tokens/{confirmation_token}']['get']['responses']['200']['content']['application/json'];

export const GET_CONFIRMATION_TOKENS_CONFIRMATION_TOKEN = new InjectionToken<
  (
    confirmationToken: string,
    params?:
      | GetConfirmationTokensConfirmationTokenParams
      | (() => GetConfirmationTokensConfirmationTokenParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetConfirmationTokensConfirmationTokenResponse>
  >
>('GET_CONFIRMATION_TOKENS_CONFIRMATION_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      confirmationToken: string,
      params?:
        | GetConfirmationTokensConfirmationTokenParams
        | (() => GetConfirmationTokensConfirmationTokenParams | undefined),
    ) =>
      httpResource<GetConfirmationTokensConfirmationTokenResponse>(() => ({
        url: `${base}/v1/confirmation_tokens/${confirmationToken}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
