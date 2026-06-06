import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoWorkflowsParams =
  paths['/repos/{owner}/{repo}/actions/workflows']['get']['parameters']['query'];

export type ActionsListRepoWorkflowsResponse =
  paths['/repos/{owner}/{repo}/actions/workflows']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_WORKFLOWS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListRepoWorkflowsParams
      | (() => ActionsListRepoWorkflowsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListRepoWorkflowsResponse>>
>('ACTIONS_LIST_REPO_WORKFLOWS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActionsListRepoWorkflowsParams
        | (() => ActionsListRepoWorkflowsParams | undefined),
    ) =>
      httpResource<ActionsListRepoWorkflowsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/workflows`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
