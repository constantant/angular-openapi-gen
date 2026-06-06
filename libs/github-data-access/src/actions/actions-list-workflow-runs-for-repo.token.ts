import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListWorkflowRunsForRepoParams =
  paths['/repos/{owner}/{repo}/actions/runs']['get']['parameters']['query'];

export type ActionsListWorkflowRunsForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runs']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_WORKFLOW_RUNS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListWorkflowRunsForRepoParams
      | (() => ActionsListWorkflowRunsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListWorkflowRunsForRepoResponse>>
>('ACTIONS_LIST_WORKFLOW_RUNS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActionsListWorkflowRunsForRepoParams
        | (() => ActionsListWorkflowRunsForRepoParams | undefined),
    ) =>
      httpResource<ActionsListWorkflowRunsForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
