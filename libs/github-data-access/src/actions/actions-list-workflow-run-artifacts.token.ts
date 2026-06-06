import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListWorkflowRunArtifactsParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts']['get']['parameters']['query'];

export type ActionsListWorkflowRunArtifactsResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    params?:
      | ActionsListWorkflowRunArtifactsParams
      | (() => ActionsListWorkflowRunArtifactsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListWorkflowRunArtifactsResponse>>
>('ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS');

export function provideActionsListWorkflowRunArtifacts(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        params?:
          | ActionsListWorkflowRunArtifactsParams
          | (() => ActionsListWorkflowRunArtifactsParams | undefined),
      ) =>
        httpResource<ActionsListWorkflowRunArtifactsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
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
