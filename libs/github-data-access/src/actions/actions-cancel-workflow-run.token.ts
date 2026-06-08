import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCancelWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/cancel']['post']['responses']['202']['content']['application/json'];

export const ACTIONS_CANCEL_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<ActionsCancelWorkflowRunResponse>>
>('ACTIONS_CANCEL_WORKFLOW_RUN');

export function provideActionsCancelWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_CANCEL_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<ActionsCancelWorkflowRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/cancel`,
          method: 'POST',
        }));
    },
  };
}
