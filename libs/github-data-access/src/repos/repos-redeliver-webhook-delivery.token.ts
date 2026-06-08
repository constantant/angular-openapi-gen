import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRedeliverWebhookDeliveryResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts']['post']['responses']['202']['content']['application/json'];

export const REPOS_REDELIVER_WEBHOOK_DELIVERY = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<ReposRedeliverWebhookDeliveryResponse>>
>('REPOS_REDELIVER_WEBHOOK_DELIVERY');

export function provideReposRedeliverWebhookDelivery(): FactoryProvider {
  return {
    provide: REPOS_REDELIVER_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        deliveryId: string,
      ) =>
        httpResource<ReposRedeliverWebhookDeliveryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries/${deliveryId}/attempts`,
          method: 'POST',
        }));
    },
  };
}
