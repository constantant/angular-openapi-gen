import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsApproveWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/approve']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_APPROVE_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<ActionsApproveWorkflowRunResponse>>
>('ACTIONS_APPROVE_WORKFLOW_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, runId: string) =>
      httpResource<ActionsApproveWorkflowRunResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/approve`,
        method: 'POST',
      }));
  },
});
