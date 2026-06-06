import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsAddCustomLabelsToSelfHostedRunnerForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['post']['requestBody']
>['content']['application/json'];

export type ActionsAddCustomLabelsToSelfHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['post']['responses']['200']['content']['application/json'];

export const ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerId: string,
      body:
        | ActionsAddCustomLabelsToSelfHostedRunnerForOrgBody
        | Signal<ActionsAddCustomLabelsToSelfHostedRunnerForOrgBody>,
    ) => ReturnType<
      typeof httpResource<ActionsAddCustomLabelsToSelfHostedRunnerForOrgResponse>
    >
  >('ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG');

export function provideActionsAddCustomLabelsToSelfHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerId: string,
        body:
          | ActionsAddCustomLabelsToSelfHostedRunnerForOrgBody
          | Signal<ActionsAddCustomLabelsToSelfHostedRunnerForOrgBody>,
      ) =>
        httpResource<ActionsAddCustomLabelsToSelfHostedRunnerForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runners/${runnerId}/labels`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
