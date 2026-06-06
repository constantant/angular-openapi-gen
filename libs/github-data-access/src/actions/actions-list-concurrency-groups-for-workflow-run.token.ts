import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListConcurrencyGroupsForWorkflowRunParams =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups']['get']['parameters']['query'];

export type ActionsListConcurrencyGroupsForWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      runId: string,
      params?:
        | ActionsListConcurrencyGroupsForWorkflowRunParams
        | (() => ActionsListConcurrencyGroupsForWorkflowRunParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListConcurrencyGroupsForWorkflowRunResponse>
    >
  >('ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN');

export function provideActionsListConcurrencyGroupsForWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        params?:
          | ActionsListConcurrencyGroupsForWorkflowRunParams
          | (() =>
              | ActionsListConcurrencyGroupsForWorkflowRunParams
              | undefined),
      ) =>
        httpResource<ActionsListConcurrencyGroupsForWorkflowRunResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/concurrency_groups`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
