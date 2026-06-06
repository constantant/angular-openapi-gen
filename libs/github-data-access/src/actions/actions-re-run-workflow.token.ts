import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsReRunWorkflowBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/rerun']['post']['requestBody']
>['content']['application/json'];

export type ActionsReRunWorkflowResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/rerun']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_RE_RUN_WORKFLOW = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    body: ActionsReRunWorkflowBody | Signal<ActionsReRunWorkflowBody>,
  ) => ReturnType<typeof httpResource<ActionsReRunWorkflowResponse>>
>('ACTIONS_RE_RUN_WORKFLOW');

export function provideActionsReRunWorkflow(): FactoryProvider {
  return {
    provide: ACTIONS_RE_RUN_WORKFLOW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        body: ActionsReRunWorkflowBody | Signal<ActionsReRunWorkflowBody>,
      ) =>
        httpResource<ActionsReRunWorkflowResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/rerun`,
          method: 'POST',
          body,
        }));
    },
  };
}
