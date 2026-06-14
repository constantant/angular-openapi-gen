import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_WORKFLOW_RUN_LOGS = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_WORKFLOW_RUN_LOGS');

export function provideActionsDeleteWorkflowRunLogs(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_WORKFLOW_RUN_LOGS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/logs`,
          method: 'DELETE',
        }));
    },
  };
}
