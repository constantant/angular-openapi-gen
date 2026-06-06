import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheStorageLimitForRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/cache/storage-limit']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheStorageLimitForRepositoryResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetActionsCacheStorageLimitForRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/cache/storage-limit`,
          }),
        );
    },
  });
