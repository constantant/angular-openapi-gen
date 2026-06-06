import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetSelfHostedRunnerGroupForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups/{runner_group_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_SELF_HOSTED_RUNNER_GROUP_FOR_ORG = new InjectionToken<
  (
    org: string,
    runnerGroupId: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetSelfHostedRunnerGroupForOrgResponse>
  >
>('ACTIONS_GET_SELF_HOSTED_RUNNER_GROUP_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, runnerGroupId: string) =>
      httpResource<ActionsGetSelfHostedRunnerGroupForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
      }));
  },
});
