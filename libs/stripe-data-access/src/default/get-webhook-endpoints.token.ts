import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetWebhookEndpointsParams =
  paths['/v1/webhook_endpoints']['get']['parameters']['query'];

export type GetWebhookEndpointsResponse =
  paths['/v1/webhook_endpoints']['get']['responses']['200']['content']['application/json'];

export const GET_WEBHOOK_ENDPOINTS = new InjectionToken<
  (
    params?:
      | GetWebhookEndpointsParams
      | (() => GetWebhookEndpointsParams | undefined),
  ) => ReturnType<typeof httpResource<GetWebhookEndpointsResponse>>
>('GET_WEBHOOK_ENDPOINTS');

export function provideGetWebhookEndpoints(): FactoryProvider {
  return {
    provide: GET_WEBHOOK_ENDPOINTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetWebhookEndpointsParams
          | (() => GetWebhookEndpointsParams | undefined),
      ) =>
        httpResource<GetWebhookEndpointsResponse>(() => ({
          url: `${base}/v1/webhook_endpoints`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
