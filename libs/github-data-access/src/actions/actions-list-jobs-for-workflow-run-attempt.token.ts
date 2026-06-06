import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListJobsForWorkflowRunAttemptParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs']['get']['parameters']['query'];

export type ActionsListJobsForWorkflowRunAttemptResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    attemptNumber: string,
    params?:
      | ActionsListJobsForWorkflowRunAttemptParams
      | (() => ActionsListJobsForWorkflowRunAttemptParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListJobsForWorkflowRunAttemptResponse>
  >
>('ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT');

export function provideActionsListJobsForWorkflowRunAttempt(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        attemptNumber: string,
        params?:
          | ActionsListJobsForWorkflowRunAttemptParams
          | (() => ActionsListJobsForWorkflowRunAttemptParams | undefined),
      ) =>
        httpResource<ActionsListJobsForWorkflowRunAttemptResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}/jobs`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
