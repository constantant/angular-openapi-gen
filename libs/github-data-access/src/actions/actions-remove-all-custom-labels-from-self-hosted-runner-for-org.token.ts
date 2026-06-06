import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/runners/{runner_id}/labels']['delete']['responses']['200']['content']['application/json'];

export const ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerId: string,
    ) => ReturnType<
      typeof httpResource<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgResponse>
    >
  >('ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerId: string) =>
        httpResource<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runners/${runnerId}/labels`,
            method: 'DELETE',
          }),
        );
    },
  });
