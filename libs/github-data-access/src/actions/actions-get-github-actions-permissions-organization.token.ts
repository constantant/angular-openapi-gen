import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetGithubActionsPermissionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetGithubActionsPermissionsOrganizationResponse>
    >
  >('ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetGithubActionsPermissionsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions`,
          }),
        );
    },
  });
