import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListWebhookDeliveriesParams =
  paths['/app/hook/deliveries']['get']['parameters']['query'];

export type AppsListWebhookDeliveriesResponse =
  paths['/app/hook/deliveries']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_WEBHOOK_DELIVERIES = new InjectionToken<
  (
    params?:
      | AppsListWebhookDeliveriesParams
      | (() => AppsListWebhookDeliveriesParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListWebhookDeliveriesResponse>>
>('APPS_LIST_WEBHOOK_DELIVERIES');

export function provideAppsListWebhookDeliveries(): FactoryProvider {
  return {
    provide: APPS_LIST_WEBHOOK_DELIVERIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListWebhookDeliveriesParams
          | (() => AppsListWebhookDeliveriesParams | undefined),
      ) =>
        httpResource<AppsListWebhookDeliveriesResponse>(() => ({
          url: `${base}/app/hook/deliveries`,
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
