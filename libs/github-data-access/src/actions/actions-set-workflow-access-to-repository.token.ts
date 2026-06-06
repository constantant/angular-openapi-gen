import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetWorkflowAccessToRepositoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/permissions/access']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActionsSetWorkflowAccessToRepositoryBody
      | Signal<ActionsSetWorkflowAccessToRepositoryBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY');

export function provideActionsSetWorkflowAccessToRepository(): FactoryProvider {
  return {
    provide: ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetWorkflowAccessToRepositoryBody
          | Signal<ActionsSetWorkflowAccessToRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/access`,
          method: 'PUT',
          body,
        }));
    },
  };
}
