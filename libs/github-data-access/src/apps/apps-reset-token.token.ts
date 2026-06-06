import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsResetTokenBody = NonNullable<
  paths['/applications/{client_id}/token']['patch']['requestBody']
>['content']['application/json'];

export type AppsResetTokenResponse =
  paths['/applications/{client_id}/token']['patch']['responses']['200']['content']['application/json'];

export const APPS_RESET_TOKEN = new InjectionToken<
  (
    clientId: string,
    body: AppsResetTokenBody | Signal<AppsResetTokenBody>,
  ) => ReturnType<typeof httpResource<AppsResetTokenResponse>>
>('APPS_RESET_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      clientId: string,
      body: AppsResetTokenBody | Signal<AppsResetTokenBody>,
    ) =>
      httpResource<AppsResetTokenResponse>(() => ({
        url: `${base}/applications/${clientId}/token`,
        method: 'PATCH',
        body,
      }));
  },
});
