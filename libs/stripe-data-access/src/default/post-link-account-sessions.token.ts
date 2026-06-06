import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostLinkAccountSessionsBody = NonNullable<
  paths['/v1/link_account_sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostLinkAccountSessionsResponse =
  paths['/v1/link_account_sessions']['post']['responses']['200']['content']['application/json'];

export const POST_LINK_ACCOUNT_SESSIONS = new InjectionToken<
  (
    body: PostLinkAccountSessionsBody | Signal<PostLinkAccountSessionsBody>,
  ) => ReturnType<typeof httpResource<PostLinkAccountSessionsResponse>>
>('POST_LINK_ACCOUNT_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostLinkAccountSessionsBody | Signal<PostLinkAccountSessionsBody>,
    ) =>
      httpResource<PostLinkAccountSessionsResponse>(() => ({
        url: `${base}/v1/link_account_sessions`,
        method: 'POST',
        body,
      }));
  },
});
