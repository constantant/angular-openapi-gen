import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateWebhookBody = NonNullable<
  paths['/orgs/{org}/hooks']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateWebhookResponse =
  paths['/orgs/{org}/hooks']['post']['responses']['201']['content']['application/json'];

export const ORGS_CREATE_WEBHOOK = new InjectionToken<
  (
    org: string,
    body: OrgsCreateWebhookBody | Signal<OrgsCreateWebhookBody>,
  ) => ReturnType<typeof httpResource<OrgsCreateWebhookResponse>>
>('ORGS_CREATE_WEBHOOK');

export function provideOrgsCreateWebhook(): FactoryProvider {
  return {
    provide: ORGS_CREATE_WEBHOOK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body: OrgsCreateWebhookBody | Signal<OrgsCreateWebhookBody>,
      ) =>
        httpResource<OrgsCreateWebhookResponse>(() => ({
          url: `${base}/orgs/${org}/hooks`,
          method: 'POST',
          body,
        }));
    },
  };
}
