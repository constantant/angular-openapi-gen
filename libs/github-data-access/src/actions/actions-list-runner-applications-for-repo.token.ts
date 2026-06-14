import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRunnerApplicationsForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/downloads']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<ActionsListRunnerApplicationsForRepoResponse>
  >
>('ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO');

export function provideActionsListRunnerApplicationsForRepo(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsListRunnerApplicationsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runners/downloads`,
        }));
    },
  };
}
