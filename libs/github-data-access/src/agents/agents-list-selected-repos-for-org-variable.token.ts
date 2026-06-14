import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListSelectedReposForOrgVariableParams =
  paths['/orgs/{org}/agents/variables/{name}/repositories']['get']['parameters']['query'];

export type AgentsListSelectedReposForOrgVariableResponse =
  paths['/orgs/{org}/agents/variables/{name}/repositories']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    params?:
      | AgentsListSelectedReposForOrgVariableParams
      | (() => AgentsListSelectedReposForOrgVariableParams | undefined),
  ) => ReturnType<
    typeof httpResource<AgentsListSelectedReposForOrgVariableResponse>
  >
>('AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE');

export function provideAgentsListSelectedReposForOrgVariable(): FactoryProvider {
  return {
    provide: AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        name: string,
        params?:
          | AgentsListSelectedReposForOrgVariableParams
          | (() => AgentsListSelectedReposForOrgVariableParams | undefined),
      ) =>
        httpResource<AgentsListSelectedReposForOrgVariableResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/agents/variables/${name}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
