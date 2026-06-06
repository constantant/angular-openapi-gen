import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetWebhookDeliveryResponse =
  paths['/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_WEBHOOK_DELIVERY = new InjectionToken<
  (
    org: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<OrgsGetWebhookDeliveryResponse>>
>('ORGS_GET_WEBHOOK_DELIVERY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, hookId: string, deliveryId: string) =>
      httpResource<OrgsGetWebhookDeliveryResponse>(() => ({
        url: `${base}/orgs/${org}/hooks/${hookId}/deliveries/${deliveryId}`,
      }));
  },
});
