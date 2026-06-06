import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSourcesBody = NonNullable<
  paths['/v1/sources']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSourcesResponse =
  paths['/v1/sources']['post']['responses']['200']['content']['application/json'];

export const POST_SOURCES = new InjectionToken<
  (
    body: PostSourcesBody | Signal<PostSourcesBody>,
  ) => ReturnType<typeof httpResource<PostSourcesResponse>>
>('POST_SOURCES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostSourcesBody | Signal<PostSourcesBody>) =>
      httpResource<PostSourcesResponse>(() => ({
        url: `${base}/v1/sources`,
        method: 'POST',
        body,
      }));
  },
});
