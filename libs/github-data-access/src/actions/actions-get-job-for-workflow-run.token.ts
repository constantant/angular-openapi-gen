import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetJobForWorkflowRunResponse =
  paths['/repos/{owner}/{repo}/actions/jobs/{job_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_JOB_FOR_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    jobId: string,
  ) => ReturnType<typeof httpResource<ActionsGetJobForWorkflowRunResponse>>
>('ACTIONS_GET_JOB_FOR_WORKFLOW_RUN');

export function provideActionsGetJobForWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_GET_JOB_FOR_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, jobId: string) =>
        httpResource<ActionsGetJobForWorkflowRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/jobs/${jobId}`,
        }));
    },
  };
}
