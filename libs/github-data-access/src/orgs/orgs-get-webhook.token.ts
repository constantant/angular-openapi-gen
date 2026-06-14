import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetWebhookResponse =
  paths['/orgs/{org}/hooks/{hook_id}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_WEBHOOK = new InjectionToken<
  (
    org: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<OrgsGetWebhookResponse>>
>('ORGS_GET_WEBHOOK');

export function provideOrgsGetWebhook(): FactoryProvider {
  return {
    provide: ORGS_GET_WEBHOOK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, hookId: string) =>
        httpResource<OrgsGetWebhookResponse>(() => ({
          url: `${base}/orgs/${org}/hooks/${hookId}`,
        }));
    },
  };
}
