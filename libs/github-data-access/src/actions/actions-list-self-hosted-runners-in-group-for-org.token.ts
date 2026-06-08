import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
  >('ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG');

export function provideActionsListSelfHostedRunnersInGroupForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        params?:
          | ActionsListSelfHostedRunnersInGroupForOrgParams
          | (() => ActionsListSelfHostedRunnersInGroupForOrgParams | undefined),
      ) =>
        httpResource<ActionsListSelfHostedRunnersInGroupForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
