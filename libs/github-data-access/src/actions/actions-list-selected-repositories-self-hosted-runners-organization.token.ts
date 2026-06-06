import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationParams =
  paths['/orgs/{org}/actions/permissions/self-hosted-runners/repositories']['get']['parameters']['query'];

export type ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/self-hosted-runners/repositories']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      params?:
        | ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationParams
        | (() =>
            | ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationResponse>
    >
  >('ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION');

export function provideActionsListSelectedRepositoriesSelfHostedRunnersOrganization(): FactoryProvider {
  return {
    provide:
      ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationParams
          | (() =>
              | ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationParams
              | undefined),
      ) =>
        httpResource<ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/self-hosted-runners/repositories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
