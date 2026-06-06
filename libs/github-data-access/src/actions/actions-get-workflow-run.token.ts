import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowRunParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}']['get']['parameters']['query'];

export type ActionsGetWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    params?:
      | ActionsGetWorkflowRunParams
      | (() => ActionsGetWorkflowRunParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsGetWorkflowRunResponse>>
>('ACTIONS_GET_WORKFLOW_RUN');

export function provideActionsGetWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_GET_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        params?:
          | ActionsGetWorkflowRunParams
          | (() => ActionsGetWorkflowRunParams | undefined),
      ) =>
        httpResource<ActionsGetWorkflowRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}`,
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
