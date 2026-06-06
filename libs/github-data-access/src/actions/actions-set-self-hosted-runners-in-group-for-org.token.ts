import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetSelfHostedRunnersInGroupForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}/runners']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      body:
        | ActionsSetSelfHostedRunnersInGroupForOrgBody
        | Signal<ActionsSetSelfHostedRunnersInGroupForOrgBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG');

export function provideActionsSetSelfHostedRunnersInGroupForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerGroupId: string,
        body:
          | ActionsSetSelfHostedRunnersInGroupForOrgBody
          | Signal<ActionsSetSelfHostedRunnersInGroupForOrgBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
          method: 'PUT',
          body,
        }));
    },
  };
}
