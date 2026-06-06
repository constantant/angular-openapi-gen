import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteWebhookEndpointsWebhookEndpointBody = NonNullable<
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteWebhookEndpointsWebhookEndpointResponse =
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT = new InjectionToken<
  (
    webhookEndpoint: string,
    body:
      | DeleteWebhookEndpointsWebhookEndpointBody
      | Signal<DeleteWebhookEndpointsWebhookEndpointBody>,
  ) => ReturnType<
    typeof httpResource<DeleteWebhookEndpointsWebhookEndpointResponse>
  >
>('DELETE_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT');

export function provideDeleteWebhookEndpointsWebhookEndpoint(): FactoryProvider {
  return {
    provide: DELETE_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        webhookEndpoint: string,
        body:
          | DeleteWebhookEndpointsWebhookEndpointBody
          | Signal<DeleteWebhookEndpointsWebhookEndpointBody>,
      ) =>
        httpResource<DeleteWebhookEndpointsWebhookEndpointResponse>(() => ({
          url: `${base}/v1/webhook_endpoints/${webhookEndpoint}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
