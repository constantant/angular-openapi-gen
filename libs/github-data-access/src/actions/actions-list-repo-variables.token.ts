import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoVariablesParams =
  paths['/repos/{owner}/{repo}/actions/variables']['get']['parameters']['query'];

export type ActionsListRepoVariablesResponse =
  paths['/repos/{owner}/{repo}/actions/variables']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_VARIABLES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListRepoVariablesParams
      | (() => ActionsListRepoVariablesParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListRepoVariablesResponse>>
>('ACTIONS_LIST_REPO_VARIABLES');

export function provideActionsListRepoVariables(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_REPO_VARIABLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListRepoVariablesParams
          | (() => ActionsListRepoVariablesParams | undefined),
      ) =>
        httpResource<ActionsListRepoVariablesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/variables`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
