import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelectedReposForOrgVariableParams =
  paths['/orgs/{org}/actions/variables/{name}/repositories']['get']['parameters']['query'];

export type ActionsListSelectedReposForOrgVariableResponse =
  paths['/orgs/{org}/actions/variables/{name}/repositories']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    params?:
      | ActionsListSelectedReposForOrgVariableParams
      | (() => ActionsListSelectedReposForOrgVariableParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListSelectedReposForOrgVariableResponse>
  >
>('ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE');

export function provideActionsListSelectedReposForOrgVariable(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        name: string,
        params?:
          | ActionsListSelectedReposForOrgVariableParams
          | (() => ActionsListSelectedReposForOrgVariableParams | undefined),
      ) =>
        httpResource<ActionsListSelectedReposForOrgVariableResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/actions/variables/${name}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
