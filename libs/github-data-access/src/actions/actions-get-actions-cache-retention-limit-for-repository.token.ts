import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheRetentionLimitForRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/cache/retention-limit']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheRetentionLimitForRepositoryResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetActionsCacheRetentionLimitForRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/cache/retention-limit`,
          }),
        );
    },
  });
