import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/workflow']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationBody
        | Signal<ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationBody
          | Signal<ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/workflow`,
          method: 'PUT',
          body,
        }));
    },
  });
