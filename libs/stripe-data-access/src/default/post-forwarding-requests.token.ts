import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostForwardingRequestsBody = NonNullable<
  paths['/v1/forwarding/requests']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostForwardingRequestsResponse =
  paths['/v1/forwarding/requests']['post']['responses']['200']['content']['application/json'];

export const POST_FORWARDING_REQUESTS = new InjectionToken<
  (
    body: PostForwardingRequestsBody | Signal<PostForwardingRequestsBody>,
  ) => ReturnType<typeof httpResource<PostForwardingRequestsResponse>>
>('POST_FORWARDING_REQUESTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostForwardingRequestsBody | Signal<PostForwardingRequestsBody>,
    ) =>
      httpResource<PostForwardingRequestsResponse>(() => ({
        url: `${base}/v1/forwarding/requests`,
        method: 'POST',
        body,
      }));
  },
});
