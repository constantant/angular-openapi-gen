import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesSetCodespacesAccessUsersBody = NonNullable<
  paths['/orgs/{org}/codespaces/access/selected_users']['post']['requestBody']
>['content']['application/json'];

export const CODESPACES_SET_CODESPACES_ACCESS_USERS = new InjectionToken<
  (
    org: string,
    body:
      | CodespacesSetCodespacesAccessUsersBody
      | Signal<CodespacesSetCodespacesAccessUsersBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_SET_CODESPACES_ACCESS_USERS');

export function provideCodespacesSetCodespacesAccessUsers(): FactoryProvider {
  return {
    provide: CODESPACES_SET_CODESPACES_ACCESS_USERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CodespacesSetCodespacesAccessUsersBody
          | Signal<CodespacesSetCodespacesAccessUsersBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/codespaces/access/selected_users`,
          method: 'POST',
          body,
        }));
    },
  };
}
