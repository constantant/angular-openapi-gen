import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse>
    >
  >('ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY');

export function provideActionsGetPrivateRepoForkPrWorkflowsSettingsRepository(): FactoryProvider {
  return {
    provide: ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/permissions/fork-pr-workflows-private-repos`,
          }),
        );
    },
  };
}
