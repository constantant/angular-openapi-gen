import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/self-hosted-runners/repositories']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationBody
        | Signal<ActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION');

export function provideActionsSetSelectedRepositoriesSelfHostedRunnersOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationBody
          | Signal<ActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/self-hosted-runners/repositories`,
          method: 'PUT',
          body,
        }));
    },
  };
}
