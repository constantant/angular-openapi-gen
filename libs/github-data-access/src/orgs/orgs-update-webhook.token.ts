import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateWebhookBody = NonNullable<
  paths['/orgs/{org}/hooks/{hook_id}']['patch']['requestBody']
>['content']['application/json'];

export type OrgsUpdateWebhookResponse =
  paths['/orgs/{org}/hooks/{hook_id}']['patch']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE_WEBHOOK = new InjectionToken<
  (
    org: string,
    hookId: string,
    body: OrgsUpdateWebhookBody | Signal<OrgsUpdateWebhookBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdateWebhookResponse>>
>('ORGS_UPDATE_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      hookId: string,
      body: OrgsUpdateWebhookBody | Signal<OrgsUpdateWebhookBody>,
    ) =>
      httpResource<OrgsUpdateWebhookResponse>(() => ({
        url: `${base}/orgs/${org}/hooks/${hookId}`,
        method: 'PATCH',
        body,
      }));
  },
});
