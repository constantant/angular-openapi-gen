import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsForceCancelWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel']['post']['responses']['202']['content']['application/json'];

export const ACTIONS_FORCE_CANCEL_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<ActionsForceCancelWorkflowRunResponse>>
>('ACTIONS_FORCE_CANCEL_WORKFLOW_RUN');

export function provideActionsForceCancelWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_FORCE_CANCEL_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<ActionsForceCancelWorkflowRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/force-cancel`,
          method: 'POST',
        }));
    },
  };
}
