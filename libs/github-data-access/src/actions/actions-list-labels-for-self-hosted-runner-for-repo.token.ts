import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListLabelsForSelfHostedRunnerForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runnerId: string,
    ) => ReturnType<
      typeof httpResource<ActionsListLabelsForSelfHostedRunnerForRepoResponse>
    >
  >('ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runnerId: string) =>
        httpResource<ActionsListLabelsForSelfHostedRunnerForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
          }),
        );
    },
  });
