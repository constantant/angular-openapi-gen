import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      runnerId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerGroupId: string, runnerId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
          method: 'PUT',
        }));
    },
  });
