import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsDeleteTokenBody = NonNullable<
  paths['/applications/{client_id}/token']['delete']['requestBody']
>['content']['application/json'];

export const APPS_DELETE_TOKEN = new InjectionToken<
  (
    clientId: string,
    body: AppsDeleteTokenBody | Signal<AppsDeleteTokenBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('APPS_DELETE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      clientId: string,
      body: AppsDeleteTokenBody | Signal<AppsDeleteTokenBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/applications/${clientId}/token`,
        method: 'DELETE',
        body,
      }));
  },
});
