import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAppsSecretsBody = NonNullable<
  paths['/v1/apps/secrets']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAppsSecretsResponse =
  paths['/v1/apps/secrets']['post']['responses']['200']['content']['application/json'];

export const POST_APPS_SECRETS = new InjectionToken<
  (
    body: PostAppsSecretsBody | Signal<PostAppsSecretsBody>,
  ) => ReturnType<typeof httpResource<PostAppsSecretsResponse>>
>('POST_APPS_SECRETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostAppsSecretsBody | Signal<PostAppsSecretsBody>) =>
      httpResource<PostAppsSecretsResponse>(() => ({
        url: `${base}/v1/apps/secrets`,
        method: 'POST',
        body,
      }));
  },
});
