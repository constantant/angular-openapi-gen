import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REDELIVER_WEBHOOK_DELIVERY = new InjectionToken<
  (
    org: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REDELIVER_WEBHOOK_DELIVERY');

export function provideOrgsRedeliverWebhookDelivery(): FactoryProvider {
  return {
    provide: ORGS_REDELIVER_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, hookId: string, deliveryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/hooks/${hookId}/deliveries/${deliveryId}/attempts`,
          method: 'POST',
        }));
    },
  };
}
