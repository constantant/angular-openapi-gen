import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListRepoVariablesParams =
  paths['/repos/{owner}/{repo}/agents/variables']['get']['parameters']['query'];

export type AgentsListRepoVariablesResponse =
  paths['/repos/{owner}/{repo}/agents/variables']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_REPO_VARIABLES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | AgentsListRepoVariablesParams
      | (() => AgentsListRepoVariablesParams | undefined),
  ) => ReturnType<typeof httpResource<AgentsListRepoVariablesResponse>>
>('AGENTS_LIST_REPO_VARIABLES');

export function provideAgentsListRepoVariables(): FactoryProvider {
  return {
    provide: AGENTS_LIST_REPO_VARIABLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | AgentsListRepoVariablesParams
          | (() => AgentsListRepoVariablesParams | undefined),
      ) =>
        httpResource<AgentsListRepoVariablesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/agents/variables`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
