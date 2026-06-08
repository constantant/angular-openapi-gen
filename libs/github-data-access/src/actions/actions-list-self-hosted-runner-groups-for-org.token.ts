import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelfHostedRunnerGroupsForOrgParams =
  paths['/orgs/{org}/actions/runner-groups']['get']['parameters']['query'];

export type ActionsListSelfHostedRunnerGroupsForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | ActionsListSelfHostedRunnerGroupsForOrgParams
        | (() => ActionsListSelfHostedRunnerGroupsForOrgParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListSelfHostedRunnerGroupsForOrgResponse>
    >
  >('ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG');

export function provideActionsListSelfHostedRunnerGroupsForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListSelfHostedRunnerGroupsForOrgParams
          | (() => ActionsListSelfHostedRunnerGroupsForOrgParams | undefined),
      ) =>
        httpResource<ActionsListSelfHostedRunnerGroupsForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/actions/runner-groups`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
