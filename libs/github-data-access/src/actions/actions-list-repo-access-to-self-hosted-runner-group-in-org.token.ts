import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoAccessToSelfHostedRunnerGroupInOrgParams =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories']['get']['parameters']['query'];

export type ActionsListRepoAccessToSelfHostedRunnerGroupInOrgResponse =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      params?:
        | ActionsListRepoAccessToSelfHostedRunnerGroupInOrgParams
        | (() =>
            | ActionsListRepoAccessToSelfHostedRunnerGroupInOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListRepoAccessToSelfHostedRunnerGroupInOrgResponse>
    >
  >('ACTIONS_LIST_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        params?:
          | ActionsListRepoAccessToSelfHostedRunnerGroupInOrgParams
          | (() =>
              | ActionsListRepoAccessToSelfHostedRunnerGroupInOrgParams
              | undefined),
      ) =>
        httpResource<ActionsListRepoAccessToSelfHostedRunnerGroupInOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
