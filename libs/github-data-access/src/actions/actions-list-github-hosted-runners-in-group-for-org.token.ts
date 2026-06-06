import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListGithubHostedRunnersInGroupForOrgParams =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners']['get']['parameters']['query'];

export type ActionsListGithubHostedRunnersInGroupForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      params?:
        | ActionsListGithubHostedRunnersInGroupForOrgParams
        | (() => ActionsListGithubHostedRunnersInGroupForOrgParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListGithubHostedRunnersInGroupForOrgResponse>
    >
  >('ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG');

export function provideActionsListGithubHostedRunnersInGroupForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        params?:
          | ActionsListGithubHostedRunnersInGroupForOrgParams
          | (() =>
              | ActionsListGithubHostedRunnersInGroupForOrgParams
              | undefined),
      ) =>
        httpResource<ActionsListGithubHostedRunnersInGroupForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/hosted-runners`,
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
