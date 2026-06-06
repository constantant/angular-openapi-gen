import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/runners/{runner_id}/labels/{name}']['delete']['responses']['200']['content']['application/json'];

export const ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerId: string,
      name: string,
    ) => ReturnType<
      typeof httpResource<ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse>
    >
  >('ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerId: string, name: string) =>
        httpResource<ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/runners/${runnerId}/labels/${name}`,
            method: 'DELETE',
          }),
        );
    },
  });
