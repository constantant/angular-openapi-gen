import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetWebhookDeliveryResponse =
  paths['/app/hook/deliveries/{delivery_id}']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_WEBHOOK_DELIVERY = new InjectionToken<
  (
    deliveryId: string,
  ) => ReturnType<typeof httpResource<AppsGetWebhookDeliveryResponse>>
>('APPS_GET_WEBHOOK_DELIVERY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (deliveryId: string) =>
      httpResource<AppsGetWebhookDeliveryResponse>(() => ({
        url: `${base}/app/hook/deliveries/${deliveryId}`,
      }));
  },
});
