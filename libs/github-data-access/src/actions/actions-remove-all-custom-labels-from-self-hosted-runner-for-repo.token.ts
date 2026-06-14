import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['delete']['responses']['200']['content']['application/json'];

export const ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runnerId: string,
    ) => ReturnType<
      typeof httpResource<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse>
    >
  >('ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO');

export function provideActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo(): FactoryProvider {
  return {
    provide: ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runnerId: string) =>
        httpResource<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
            method: 'DELETE',
          }),
        );
    },
  };
}
