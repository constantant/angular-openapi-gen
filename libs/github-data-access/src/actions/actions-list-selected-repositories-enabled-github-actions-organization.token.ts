import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationParams =
  paths['/orgs/{org}/actions/permissions/repositories']['get']['parameters']['query'];

export type ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/repositories']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      params?:
        | ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationParams
        | (() =>
            | ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse>
    >
  >('ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION');

export function provideActionsListSelectedRepositoriesEnabledGithubActionsOrganization(): FactoryProvider {
  return {
    provide:
      ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationParams
          | (() =>
              | ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationParams
              | undefined),
      ) =>
        httpResource<ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/orgs/${org}/actions/permissions/repositories`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
