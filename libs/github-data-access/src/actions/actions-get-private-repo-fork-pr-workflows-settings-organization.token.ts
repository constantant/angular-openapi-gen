import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/fork-pr-workflows-private-repos']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationResponse>
    >
  >('ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION');

export function provideActionsGetPrivateRepoForkPrWorkflowsSettingsOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/fork-pr-workflows-private-repos`,
          }),
        );
    },
  };
}
