import { InjectionToken, inject } from '@angular/core';
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
>('AGENTS_LIST_REPO_VARIABLES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | AgentsListRepoVariablesParams
        | (() => AgentsListRepoVariablesParams | undefined),
    ) =>
      httpResource<AgentsListRepoVariablesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/agents/variables`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
