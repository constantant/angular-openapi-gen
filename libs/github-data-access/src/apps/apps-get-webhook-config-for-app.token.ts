import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetWebhookConfigForAppResponse =
  paths['/app/hook/config']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_WEBHOOK_CONFIG_FOR_APP = new InjectionToken<
  () => ReturnType<typeof httpResource<AppsGetWebhookConfigForAppResponse>>
>('APPS_GET_WEBHOOK_CONFIG_FOR_APP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<AppsGetWebhookConfigForAppResponse>(() => ({
        url: `${base}/app/hook/config`,
      }));
  },
});
