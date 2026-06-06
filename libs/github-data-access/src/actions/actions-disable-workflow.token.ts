import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DISABLE_WORKFLOW = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DISABLE_WORKFLOW');

export function provideActionsDisableWorkflow(): FactoryProvider {
  return {
    provide: ACTIONS_DISABLE_WORKFLOW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, workflowId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}/disable`,
          method: 'PUT',
        }));
    },
  };
}
