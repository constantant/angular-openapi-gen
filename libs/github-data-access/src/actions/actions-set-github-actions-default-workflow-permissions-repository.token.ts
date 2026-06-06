import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryBody =
  NonNullable<
    paths['/repos/{owner}/{repo}/actions/permissions/workflow']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryBody
        | Signal<ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY');

export function provideActionsSetGithubActionsDefaultWorkflowPermissionsRepository(): FactoryProvider {
  return {
    provide: ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryBody
          | Signal<ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/workflow`,
          method: 'PUT',
          body,
        }));
    },
  };
}
