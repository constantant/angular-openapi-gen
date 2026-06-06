import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTokensBody = NonNullable<
  paths['/v1/tokens']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTokensResponse =
  paths['/v1/tokens']['post']['responses']['200']['content']['application/json'];

export const POST_TOKENS = new InjectionToken<
  (
    body: PostTokensBody | Signal<PostTokensBody>,
  ) => ReturnType<typeof httpResource<PostTokensResponse>>
>('POST_TOKENS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTokensBody | Signal<PostTokensBody>) =>
      httpResource<PostTokensResponse>(() => ({
        url: `${base}/v1/tokens`,
        method: 'POST',
        body,
      }));
  },
});
