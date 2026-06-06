import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetWebhookEndpointsWebhookEndpointParams =
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['get']['parameters']['query'];

export type GetWebhookEndpointsWebhookEndpointResponse =
  paths['/v1/webhook_endpoints/{webhook_endpoint}']['get']['responses']['200']['content']['application/json'];

export const GET_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT = new InjectionToken<
  (
    webhookEndpoint: string,
    params?:
      | GetWebhookEndpointsWebhookEndpointParams
      | (() => GetWebhookEndpointsWebhookEndpointParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetWebhookEndpointsWebhookEndpointResponse>
  >
>('GET_WEBHOOK_ENDPOINTS_WEBHOOK_ENDPOINT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      webhookEndpoint: string,
      params?:
        | GetWebhookEndpointsWebhookEndpointParams
        | (() => GetWebhookEndpointsWebhookEndpointParams | undefined),
    ) =>
      httpResource<GetWebhookEndpointsWebhookEndpointResponse>(() => ({
        url: `${base}/v1/webhook_endpoints/${webhookEndpoint}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
