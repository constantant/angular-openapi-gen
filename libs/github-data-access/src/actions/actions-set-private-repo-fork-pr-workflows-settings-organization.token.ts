import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/fork-pr-workflows-private-repos']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationBody
        | Signal<ActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationBody
          | Signal<ActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/fork-pr-workflows-private-repos`,
          method: 'PUT',
          body,
        }));
    },
  });
