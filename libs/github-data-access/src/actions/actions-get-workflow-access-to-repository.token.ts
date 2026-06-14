import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetWorkflowAccessToRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions/access']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetWorkflowAccessToRepositoryResponse>
  >
>('ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY');

export function provideActionsGetWorkflowAccessToRepository(): FactoryProvider {
  return {
    provide: ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetWorkflowAccessToRepositoryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/access`,
        }));
    },
  };
}
