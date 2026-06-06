import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateWebhookConfigForOrgBody = NonNullable<
  paths['/orgs/{org}/hooks/{hook_id}/config']['patch']['requestBody']
>['content']['application/json'];

export type OrgsUpdateWebhookConfigForOrgResponse =
  paths['/orgs/{org}/hooks/{hook_id}/config']['patch']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG = new InjectionToken<
  (
    org: string,
    hookId: string,
    body:
      | OrgsUpdateWebhookConfigForOrgBody
      | Signal<OrgsUpdateWebhookConfigForOrgBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdateWebhookConfigForOrgResponse>>
>('ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      hookId: string,
      body:
        | OrgsUpdateWebhookConfigForOrgBody
        | Signal<OrgsUpdateWebhookConfigForOrgBody>,
    ) =>
      httpResource<OrgsUpdateWebhookConfigForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/hooks/${hookId}/config`,
        method: 'PATCH',
        body,
      }));
  },
});
