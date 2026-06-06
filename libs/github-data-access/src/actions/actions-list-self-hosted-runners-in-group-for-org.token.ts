import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelfHostedRunnersInGroupForOrgParams =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/runners']['get']['parameters']['query'];

export type ActionsListSelfHostedRunnersInGroupForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      params?:
        | ActionsListSelfHostedRunnersInGroupForOrgParams
        | (() => ActionsListSelfHostedRunnersInGroupForOrgParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListSelfHostedRunnersInGroupForOrgResponse>
    >
  >('ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        params?:
          | ActionsListSelfHostedRunnersInGroupForOrgParams
          | (() => ActionsListSelfHostedRunnersInGroupForOrgParams | undefined),
      ) =>
        httpResource<ActionsListSelfHostedRunnersInGroupForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
