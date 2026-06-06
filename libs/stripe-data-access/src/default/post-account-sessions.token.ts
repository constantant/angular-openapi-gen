import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountSessionsBody = NonNullable<
  paths['/v1/account_sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountSessionsResponse =
  paths['/v1/account_sessions']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNT_SESSIONS = new InjectionToken<
  (
    body: PostAccountSessionsBody | Signal<PostAccountSessionsBody>,
  ) => ReturnType<typeof httpResource<PostAccountSessionsResponse>>
>('POST_ACCOUNT_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostAccountSessionsBody | Signal<PostAccountSessionsBody>) =>
      httpResource<PostAccountSessionsResponse>(() => ({
        url: `${base}/v1/account_sessions`,
        method: 'POST',
        body,
      }));
  },
});
