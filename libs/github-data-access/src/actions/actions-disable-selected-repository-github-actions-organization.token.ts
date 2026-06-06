import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  });
