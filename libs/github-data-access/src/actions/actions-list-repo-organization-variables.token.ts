import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoOrganizationVariablesParams =
  paths['/repos/{owner}/{repo}/actions/organization-variables']['get']['parameters']['query'];

export type ActionsListRepoOrganizationVariablesResponse =
  paths['/repos/{owner}/{repo}/actions/organization-variables']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListRepoOrganizationVariablesParams
      | (() => ActionsListRepoOrganizationVariablesParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListRepoOrganizationVariablesResponse>
  >
>('ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES');

export function provideActionsListRepoOrganizationVariables(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListRepoOrganizationVariablesParams
          | (() => ActionsListRepoOrganizationVariablesParams | undefined),
      ) =>
        httpResource<ActionsListRepoOrganizationVariablesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/organization-variables`,
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
