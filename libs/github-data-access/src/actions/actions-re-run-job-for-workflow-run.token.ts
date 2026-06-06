import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsReRunJobForWorkflowRunBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/jobs/{job_id}/rerun']['post']['requestBody']
>['content']['application/json'];

export type ActionsReRunJobForWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/jobs/{job_id}/rerun']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    jobId: string,
    body:
      | ActionsReRunJobForWorkflowRunBody
      | Signal<ActionsReRunJobForWorkflowRunBody>,
  ) => ReturnType<typeof httpResource<ActionsReRunJobForWorkflowRunResponse>>
>('ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN');

export function provideActionsReRunJobForWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        jobId: string,
        body:
          | ActionsReRunJobForWorkflowRunBody
          | Signal<ActionsReRunJobForWorkflowRunBody>,
      ) =>
        httpResource<ActionsReRunJobForWorkflowRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/jobs/${jobId}/rerun`,
          method: 'POST',
          body,
        }));
    },
  };
}
