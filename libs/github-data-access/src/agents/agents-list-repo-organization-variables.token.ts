import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListRepoOrganizationVariablesParams =
  paths['/repos/{owner}/{repo}/agents/organization-variables']['get']['parameters']['query'];

export type AgentsListRepoOrganizationVariablesResponse =
  paths['/repos/{owner}/{repo}/agents/organization-variables']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_REPO_ORGANIZATION_VARIABLES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | AgentsListRepoOrganizationVariablesParams
      | (() => AgentsListRepoOrganizationVariablesParams | undefined),
  ) => ReturnType<
    typeof httpResource<AgentsListRepoOrganizationVariablesResponse>
  >
>('AGENTS_LIST_REPO_ORGANIZATION_VARIABLES');

export function provideAgentsListRepoOrganizationVariables(): FactoryProvider {
  return {
    provide: AGENTS_LIST_REPO_ORGANIZATION_VARIABLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | AgentsListRepoOrganizationVariablesParams
          | (() => AgentsListRepoOrganizationVariablesParams | undefined),
      ) =>
        httpResource<AgentsListRepoOrganizationVariablesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/organization-variables`,
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
