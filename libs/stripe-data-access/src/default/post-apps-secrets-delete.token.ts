import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAppsSecretsDeleteBody = NonNullable<
  paths['/v1/apps/secrets/delete']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAppsSecretsDeleteResponse =
  paths['/v1/apps/secrets/delete']['post']['responses']['200']['content']['application/json'];

export const POST_APPS_SECRETS_DELETE = new InjectionToken<
  (
    body: PostAppsSecretsDeleteBody | Signal<PostAppsSecretsDeleteBody>,
  ) => ReturnType<typeof httpResource<PostAppsSecretsDeleteResponse>>
>('POST_APPS_SECRETS_DELETE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostAppsSecretsDeleteBody | Signal<PostAppsSecretsDeleteBody>,
    ) =>
      httpResource<PostAppsSecretsDeleteResponse>(() => ({
        url: `${base}/v1/apps/secrets/delete`,
        method: 'POST',
        body,
      }));
  },
});
