import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteWebhookEndpointsWebhookEndpointBody = NonNullable<
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteWebhookEndpointsWebhookEndpointResponse =
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT = new InjectionToken<
  (
    webhook_endpoint: string,
    body:
      | DeleteWebhookEndpointsWebhookEndpointBody
      | Signal<DeleteWebhookEndpointsWebhookEndpointBody>,
  ) => ReturnType<
    typeof httpResource<DeleteWebhookEndpointsWebhookEndpointResponse>
  >
>('DELETE_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      webhook_endpoint: string,
      body:
        | DeleteWebhookEndpointsWebhookEndpointBody
        | Signal<DeleteWebhookEndpointsWebhookEndpointBody>,
    ) =>
      httpResource<DeleteWebhookEndpointsWebhookEndpointResponse>(() => ({
        url: `${base}/v1/webhook_endpoints/${webhook_endpoint}`,
        method: 'DELETE',
        body,
      }));
  },
});
