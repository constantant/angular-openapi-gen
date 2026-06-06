import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowResponse =
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
  ) => ReturnType<typeof httpResource<ActionsGetWorkflowResponse>>
>('ACTIONS_GET_WORKFLOW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, workflowId: string) =>
      httpResource<ActionsGetWorkflowResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}`,
      }));
  },
});
