import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListWorkflowRunsParams =
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs']['get']['parameters']['query'];

export type ActionsListWorkflowRunsResponse =
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_WORKFLOW_RUNS = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
    params?:
      | ActionsListWorkflowRunsParams
      | (() => ActionsListWorkflowRunsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListWorkflowRunsResponse>>
>('ACTIONS_LIST_WORKFLOW_RUNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      workflowId: string,
      params?:
        | ActionsListWorkflowRunsParams
        | (() => ActionsListWorkflowRunsParams | undefined),
    ) =>
      httpResource<ActionsListWorkflowRunsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
