import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetWebhookConfigForOrgResponse =
  paths['/orgs/{org}/hooks/{hook_id}/config']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_WEBHOOK_CONFIG_FOR_ORG = new InjectionToken<
  (
    org: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<OrgsGetWebhookConfigForOrgResponse>>
>('ORGS_GET_WEBHOOK_CONFIG_FOR_ORG');

export function provideOrgsGetWebhookConfigForOrg(): FactoryProvider {
  return {
    provide: ORGS_GET_WEBHOOK_CONFIG_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, hookId: string) =>
        httpResource<OrgsGetWebhookConfigForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/hooks/${hookId}/config`,
        }));
    },
  };
}
