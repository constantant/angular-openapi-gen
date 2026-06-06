import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      body:
        | ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgBody
        | Signal<ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        body:
          | ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgBody
          | Signal<ActionsSetRepoAccessToSelfHostedRunnerGroupInOrgBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
          method: 'PUT',
          body,
        }));
    },
  });
