import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_REDELIVER_WEBHOOK_DELIVERY = new InjectionToken<
  (deliveryId: string) => ReturnType<typeof httpResource<unknown>>
>('APPS_REDELIVER_WEBHOOK_DELIVERY');

export function provideAppsRedeliverWebhookDelivery(): FactoryProvider {
  return {
    provide: APPS_REDELIVER_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (deliveryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/app/hook/deliveries/${deliveryId}/attempts`,
          method: 'POST',
        }));
    },
  };
}
