import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostIssuingTokensTokenBody = NonNullable<
  paths['/v1/issuing/tokens/{token}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostIssuingTokensTokenResponse =
  paths['/v1/issuing/tokens/{token}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_TOKENS_TOKEN = new InjectionToken<
  (
    token: string,
    body: PostIssuingTokensTokenBody | Signal<PostIssuingTokensTokenBody>,
  ) => ReturnType<typeof httpResource<PostIssuingTokensTokenResponse>>
>('POST_ISSUING_TOKENS_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      token: string,
      body: PostIssuingTokensTokenBody | Signal<PostIssuingTokensTokenBody>,
    ) =>
      httpResource<PostIssuingTokensTokenResponse>(() => ({
        url: `${base}/v1/issuing/tokens/${token}`,
        method: 'POST',
        body,
      }));
  },
});
