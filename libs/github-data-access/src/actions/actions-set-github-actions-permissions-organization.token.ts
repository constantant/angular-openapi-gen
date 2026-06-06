import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetGithubActionsPermissionsOrganizationBody = NonNullable<
  paths['/orgs/{org}/actions/permissions']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetGithubActionsPermissionsOrganizationBody
        | Signal<ActionsSetGithubActionsPermissionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetGithubActionsPermissionsOrganizationBody
          | Signal<ActionsSetGithubActionsPermissionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions`,
          method: 'PUT',
          body,
        }));
    },
  });
