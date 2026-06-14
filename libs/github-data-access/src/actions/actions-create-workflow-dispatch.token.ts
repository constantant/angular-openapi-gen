import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateWorkflowDispatchBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateWorkflowDispatchResponse =
  paths['/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches']['post']['responses']['200']['content']['application/json'];

export const ACTIONS_CREATE_WORKFLOW_DISPATCH = new InjectionToken<
  (
    owner: string,
    repo: string,
    workflowId: string,
    body:
      | ActionsCreateWorkflowDispatchBody
      | Signal<ActionsCreateWorkflowDispatchBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateWorkflowDispatchResponse>>
>('ACTIONS_CREATE_WORKFLOW_DISPATCH');

export function provideActionsCreateWorkflowDispatch(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_WORKFLOW_DISPATCH,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        workflowId: string,
        body:
          | ActionsCreateWorkflowDispatchBody
          | Signal<ActionsCreateWorkflowDispatchBody>,
      ) =>
        httpResource<ActionsCreateWorkflowDispatchResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
          method: 'POST',
          body,
        }));
    },
  };
}
