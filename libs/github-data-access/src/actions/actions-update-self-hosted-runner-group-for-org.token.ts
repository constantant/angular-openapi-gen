import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsUpdateSelfHostedRunnerGroupForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}']['patch']['requestBody']
>['content']['application/json'];

export type ActionsUpdateSelfHostedRunnerGroupForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}']['patch']['responses']['200']['content']['application/json'];

export const ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      body:
        | ActionsUpdateSelfHostedRunnerGroupForOrgBody
        | Signal<ActionsUpdateSelfHostedRunnerGroupForOrgBody>,
    ) => ReturnType<
      typeof httpResource<ActionsUpdateSelfHostedRunnerGroupForOrgResponse>
    >
  >('ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG');

export function provideActionsUpdateSelfHostedRunnerGroupForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        body:
          | ActionsUpdateSelfHostedRunnerGroupForOrgBody
          | Signal<ActionsUpdateSelfHostedRunnerGroupForOrgBody>,
      ) =>
        httpResource<ActionsUpdateSelfHostedRunnerGroupForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
