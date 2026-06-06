import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowUsageResponse =
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW_USAGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
  ) => ReturnType<typeof httpResource<ActionsGetWorkflowUsageResponse>>
>('ACTIONS_GET_WORKFLOW_USAGE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, workflowId: string) =>
      httpResource<ActionsGetWorkflowUsageResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}/timing`,
      }));
  },
});
