import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/workflow']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationResponse>
    >
  >('ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/workflow`,
          }),
        );
    },
  });
