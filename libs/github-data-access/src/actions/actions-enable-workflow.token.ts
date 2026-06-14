import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_ENABLE_WORKFLOW = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_ENABLE_WORKFLOW');

export function provideActionsEnableWorkflow(): FactoryProvider {
  return {
    provide: ACTIONS_ENABLE_WORKFLOW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, workflowId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}/enable`,
          method: 'PUT',
        }));
    },
  };
}
