import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryBody =
  NonNullable<
    paths['/repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryBody
        | Signal<ActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryBody
          | Signal<ActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/fork-pr-workflows-private-repos`,
          method: 'PUT',
          body,
        }));
    },
  });
