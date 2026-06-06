import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetCustomLabelsForSelfHostedRunnerForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['put']['requestBody']
>['content']['application/json'];

export type ActionsSetCustomLabelsForSelfHostedRunnerForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['put']['responses']['200']['content']['application/json'];

export const ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runnerId: string,
      body:
        | ActionsSetCustomLabelsForSelfHostedRunnerForRepoBody
        | Signal<ActionsSetCustomLabelsForSelfHostedRunnerForRepoBody>,
    ) => ReturnType<
      typeof httpResource<ActionsSetCustomLabelsForSelfHostedRunnerForRepoResponse>
    >
  >('ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runnerId: string,
        body:
          | ActionsSetCustomLabelsForSelfHostedRunnerForRepoBody
          | Signal<ActionsSetCustomLabelsForSelfHostedRunnerForRepoBody>,
      ) =>
        httpResource<ActionsSetCustomLabelsForSelfHostedRunnerForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
            method: 'PUT',
            body,
          }),
        );
    },
  });
