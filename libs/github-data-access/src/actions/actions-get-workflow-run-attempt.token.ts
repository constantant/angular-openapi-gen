import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowRunAttemptParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}']['get']['parameters']['query'];

export type ActionsGetWorkflowRunAttemptResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW_RUN_ATTEMPT = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    attemptNumber: string,
    params?:
      | ActionsGetWorkflowRunAttemptParams
      | (() => ActionsGetWorkflowRunAttemptParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsGetWorkflowRunAttemptResponse>>
>('ACTIONS_GET_WORKFLOW_RUN_ATTEMPT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      runId: string,
      attemptNumber: string,
      params?:
        | ActionsGetWorkflowRunAttemptParams
        | (() => ActionsGetWorkflowRunAttemptParams | undefined),
    ) =>
      httpResource<ActionsGetWorkflowRunAttemptResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
