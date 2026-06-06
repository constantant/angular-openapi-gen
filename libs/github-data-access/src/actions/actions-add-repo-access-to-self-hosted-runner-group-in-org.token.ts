import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_ADD_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG =
  new InjectionToken<
    (
      org: string,
      runnerGroupId: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_ADD_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerGroupId: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  });
