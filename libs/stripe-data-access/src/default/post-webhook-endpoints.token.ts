import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostWebhookEndpointsBody = NonNullable<
  paths['/v1/webhook_endpoints']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostWebhookEndpointsResponse =
  paths['/v1/webhook_endpoints']['post']['responses']['200']['content']['application/json'];

export const POST_WEBHOOK_ENDPOINTS = new InjectionToken<
  (
    body: PostWebhookEndpointsBody | Signal<PostWebhookEndpointsBody>,
  ) => ReturnType<typeof httpResource<PostWebhookEndpointsResponse>>
>('POST_WEBHOOK_ENDPOINTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostWebhookEndpointsBody | Signal<PostWebhookEndpointsBody>,
    ) =>
      httpResource<PostWebhookEndpointsResponse>(() => ({
        url: `${base}/v1/webhook_endpoints`,
        method: 'POST',
        body,
      }));
  },
});
