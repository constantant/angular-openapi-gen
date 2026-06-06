import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCustomPropertiesForReposGetRepositoryValuesResponse =
  paths['/repos/{owner}/{repo}/properties/values']['get']['responses']['200']['content']['application/json'];

export const REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ReposCustomPropertiesForReposGetRepositoryValuesResponse>
    >
  >('REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposCustomPropertiesForReposGetRepositoryValuesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/properties/values`,
          }),
        );
    },
  });
