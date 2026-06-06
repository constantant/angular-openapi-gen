import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostEphemeralKeysBody = NonNullable<
  paths['/v1/ephemeral_keys']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostEphemeralKeysResponse =
  paths['/v1/ephemeral_keys']['post']['responses']['200']['content']['application/json'];

export const POST_EPHEMERAL_KEYS = new InjectionToken<
  (
    body: PostEphemeralKeysBody | Signal<PostEphemeralKeysBody>,
  ) => ReturnType<typeof httpResource<PostEphemeralKeysResponse>>
>('POST_EPHEMERAL_KEYS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostEphemeralKeysBody | Signal<PostEphemeralKeysBody>) =>
      httpResource<PostEphemeralKeysResponse>(() => ({
        url: `${base}/v1/ephemeral_keys`,
        method: 'POST',
        body,
      }));
  },
});
