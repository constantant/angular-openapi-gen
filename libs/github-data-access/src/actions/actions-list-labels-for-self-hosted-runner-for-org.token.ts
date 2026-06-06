import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListLabelsForSelfHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerId: string,
    ) => ReturnType<
      typeof httpResource<ActionsListLabelsForSelfHostedRunnerForOrgResponse>
    >
  >('ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG');

export function provideActionsListLabelsForSelfHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerId: string) =>
        httpResource<ActionsListLabelsForSelfHostedRunnerForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runners/${runnerId}/labels`,
          }),
        );
    },
  };
}
