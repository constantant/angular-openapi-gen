import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesDeleteCodespacesAccessUsersBody = NonNullable<
  paths['/orgs/{org}/codespaces/access/selected_users']['delete']['requestBody']
>['content']['application/json'];

export const CODESPACES_DELETE_CODESPACES_ACCESS_USERS = new InjectionToken<
  (
    org: string,
    body:
      | CodespacesDeleteCodespacesAccessUsersBody
      | Signal<CodespacesDeleteCodespacesAccessUsersBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_DELETE_CODESPACES_ACCESS_USERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | CodespacesDeleteCodespacesAccessUsersBody
        | Signal<CodespacesDeleteCodespacesAccessUsersBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/codespaces/access/selected_users`,
        method: 'DELETE',
        body,
      }));
  },
});
