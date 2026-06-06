import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}']['delete']['responses']['200']['content']['application/json'];

export const ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_REPO =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runnerId: string,
      name: string,
    ) => ReturnType<
      typeof httpResource<ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoResponse>
    >
  >('ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_REPO', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runnerId: string, name: string) =>
        httpResource<ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}/labels/${name}`,
            method: 'DELETE',
          }),
        );
    },
  });
