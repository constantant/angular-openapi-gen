import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowRunUsageResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/timing']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW_RUN_USAGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<ActionsGetWorkflowRunUsageResponse>>
>('ACTIONS_GET_WORKFLOW_RUN_USAGE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, runId: string) =>
      httpResource<ActionsGetWorkflowRunUsageResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/timing`,
      }));
  },
});
