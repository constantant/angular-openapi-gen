import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_WORKFLOW_RUN');

export function provideActionsDeleteWorkflowRun(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_WORKFLOW_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}`,
          method: 'DELETE',
        }));
    },
  };
}
