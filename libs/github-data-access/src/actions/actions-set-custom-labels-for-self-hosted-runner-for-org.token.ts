import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetCustomLabelsForSelfHostedRunnerForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['put']['requestBody']
>['content']['application/json'];

export type ActionsSetCustomLabelsForSelfHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['put']['responses']['200']['content']['application/json'];

export const ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerId: string,
      body:
        | ActionsSetCustomLabelsForSelfHostedRunnerForOrgBody
        | Signal<ActionsSetCustomLabelsForSelfHostedRunnerForOrgBody>,
    ) => ReturnType<
      typeof httpResource<ActionsSetCustomLabelsForSelfHostedRunnerForOrgResponse>
    >
  >('ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        runnerId: string,
        body:
          | ActionsSetCustomLabelsForSelfHostedRunnerForOrgBody
          | Signal<ActionsSetCustomLabelsForSelfHostedRunnerForOrgBody>,
      ) =>
        httpResource<ActionsSetCustomLabelsForSelfHostedRunnerForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runners/${runnerId}/labels`,
            method: 'PUT',
            body,
          }),
        );
    },
  });
