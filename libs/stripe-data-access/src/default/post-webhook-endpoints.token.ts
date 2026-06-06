import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostWebhookEndpointsBody = NonNullable<
  paths['/v1/webhook_endpoints']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostWebhookEndpointsResponse =
  paths['/v1/webhook_endpoints']['post']['responses']['200']['content']['application/json'];

export const POST_WEBHOOK_ENDPOINTS = new InjectionToken<
  (
    body: PostWebhookEndpointsBody | Signal<PostWebhookEndpointsBody>,
  ) => ReturnType<typeof httpResource<PostWebhookEndpointsResponse>>
>('POST_WEBHOOK_ENDPOINTS');

export function providePostWebhookEndpoints(): FactoryProvider {
  return {
    provide: POST_WEBHOOK_ENDPOINTS,
    useFactory: () => {
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
  };
}
