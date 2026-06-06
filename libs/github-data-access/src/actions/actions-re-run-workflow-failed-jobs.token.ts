import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsReRunWorkflowFailedJobsBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs']['post']['requestBody']
>['content']['application/json'];

export type ActionsReRunWorkflowFailedJobsResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    body:
      | ActionsReRunWorkflowFailedJobsBody
      | Signal<ActionsReRunWorkflowFailedJobsBody>,
  ) => ReturnType<typeof httpResource<ActionsReRunWorkflowFailedJobsResponse>>
>('ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      runId: string,
      body:
        | ActionsReRunWorkflowFailedJobsBody
        | Signal<ActionsReRunWorkflowFailedJobsBody>,
    ) =>
      httpResource<ActionsReRunWorkflowFailedJobsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/rerun-failed-jobs`,
        method: 'POST',
        body,
      }));
  },
});
