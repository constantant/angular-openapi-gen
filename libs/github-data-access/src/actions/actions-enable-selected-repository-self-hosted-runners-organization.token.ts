import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_ENABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_ENABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/self-hosted-runners/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  });
