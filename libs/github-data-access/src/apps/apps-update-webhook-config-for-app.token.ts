import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsUpdateWebhookConfigForAppBody = NonNullable<
  paths['/app/hook/config']['patch']['requestBody']
>['content']['application/json'];

export type AppsUpdateWebhookConfigForAppResponse =
  paths['/app/hook/config']['patch']['responses']['200']['content']['application/json'];

export const APPS_UPDATE_WEBHOOK_CONFIG_FOR_APP = new InjectionToken<
  (
    body:
      | AppsUpdateWebhookConfigForAppBody
      | Signal<AppsUpdateWebhookConfigForAppBody>,
  ) => ReturnType<typeof httpResource<AppsUpdateWebhookConfigForAppResponse>>
>('APPS_UPDATE_WEBHOOK_CONFIG_FOR_APP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body:
        | AppsUpdateWebhookConfigForAppBody
        | Signal<AppsUpdateWebhookConfigForAppBody>,
    ) =>
      httpResource<AppsUpdateWebhookConfigForAppResponse>(() => ({
        url: `${base}/app/hook/config`,
        method: 'PATCH',
        body,
      }));
  },
});
