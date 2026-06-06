import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostWebhookEndpointsWebhookEndpointBody = NonNullable<
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostWebhookEndpointsWebhookEndpointResponse =
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['post']['responses']['200']['content']['application/json'];

export const POST_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT = new InjectionToken<
  (
    webhookEndpoint: string,
    body:
      | PostWebhookEndpointsWebhookEndpointBody
      | Signal<PostWebhookEndpointsWebhookEndpointBody>,
  ) => ReturnType<
    typeof httpResource<PostWebhookEndpointsWebhookEndpointResponse>
  >
>('POST_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      webhookEndpoint: string,
      body:
        | PostWebhookEndpointsWebhookEndpointBody
        | Signal<PostWebhookEndpointsWebhookEndpointBody>,
    ) =>
      httpResource<PostWebhookEndpointsWebhookEndpointResponse>(() => ({
        url: `${base}/v1/webhook_endpoints/${webhookEndpoint}`,
        method: 'POST',
        body,
      }));
  },
});
