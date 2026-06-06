import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetWebhookDeliveryResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_WEBHOOK_DELIVERY = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookDeliveryResponse>>
>('REPOS_GET_WEBHOOK_DELIVERY');

export function provideReposGetWebhookDelivery(): FactoryProvider {
  return {
    provide: REPOS_GET_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        deliveryId: string,
      ) =>
        httpResource<ReposGetWebhookDeliveryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries/${deliveryId}`,
        }));
    },
  };
}
