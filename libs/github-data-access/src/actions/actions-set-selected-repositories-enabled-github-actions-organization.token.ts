import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/repositories']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationBody
        | Signal<ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION');

export function provideActionsSetSelectedRepositoriesEnabledGithubActionsOrganization(): FactoryProvider {
  return {
    provide:
      ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationBody
          | Signal<ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/repositories`,
          method: 'PUT',
          body,
        }));
    },
  };
}
