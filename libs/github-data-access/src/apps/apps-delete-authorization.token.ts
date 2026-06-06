import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsDeleteAuthorizationBody = NonNullable<
  paths['/applications/{client_id}/grant']['delete']['requestBody']
>['content']['application/json'];

export const APPS_DELETE_AUTHORIZATION = new InjectionToken<
  (
    clientId: string,
    body: AppsDeleteAuthorizationBody | Signal<AppsDeleteAuthorizationBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('APPS_DELETE_AUTHORIZATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      clientId: string,
      body: AppsDeleteAuthorizationBody | Signal<AppsDeleteAuthorizationBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/applications/${clientId}/grant`,
        method: 'DELETE',
        body,
      }));
  },
});
