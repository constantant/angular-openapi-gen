import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsAddCustomLabelsToSelfHostedRunnerForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['post']['requestBody']
>['content']['application/json'];

export type ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/{runner_id}/labels']['post']['responses']['200']['content']['application/json'];

export const ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runnerId: string,
      body:
        | ActionsAddCustomLabelsToSelfHostedRunnerForRepoBody
        | Signal<ActionsAddCustomLabelsToSelfHostedRunnerForRepoBody>,
    ) => ReturnType<
      typeof httpResource<ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse>
    >
  >('ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runnerId: string,
        body:
          | ActionsAddCustomLabelsToSelfHostedRunnerForRepoBody
          | Signal<ActionsAddCustomLabelsToSelfHostedRunnerForRepoBody>,
      ) =>
        httpResource<ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}/labels`,
            method: 'POST',
            body,
          }),
        );
    },
  });
