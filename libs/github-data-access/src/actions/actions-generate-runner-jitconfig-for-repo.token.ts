import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGenerateRunnerJitconfigForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runners/generate-jitconfig']['post']['requestBody']
>['content']['application/json'];

export type ActionsGenerateRunnerJitconfigForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/generate-jitconfig']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActionsGenerateRunnerJitconfigForRepoBody
      | Signal<ActionsGenerateRunnerJitconfigForRepoBody>,
  ) => ReturnType<
    typeof httpResource<ActionsGenerateRunnerJitconfigForRepoResponse>
  >
>('ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | ActionsGenerateRunnerJitconfigForRepoBody
        | Signal<ActionsGenerateRunnerJitconfigForRepoBody>,
    ) =>
      httpResource<ActionsGenerateRunnerJitconfigForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runners/generate-jitconfig`,
        method: 'POST',
        body,
      }));
  },
});
