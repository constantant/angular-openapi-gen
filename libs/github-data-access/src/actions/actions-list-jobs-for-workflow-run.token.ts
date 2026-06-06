import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListJobsForWorkflowRunParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/jobs']['get']['parameters']['query'];

export type ActionsListJobsForWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/jobs']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    params?:
      | ActionsListJobsForWorkflowRunParams
      | (() => ActionsListJobsForWorkflowRunParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListJobsForWorkflowRunResponse>>
>('ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      runId: string,
      params?:
        | ActionsListJobsForWorkflowRunParams
        | (() => ActionsListJobsForWorkflowRunParams | undefined),
    ) =>
      httpResource<ActionsListJobsForWorkflowRunResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
