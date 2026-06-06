import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DISABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_DISABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/settings/immutable-releases/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  });
