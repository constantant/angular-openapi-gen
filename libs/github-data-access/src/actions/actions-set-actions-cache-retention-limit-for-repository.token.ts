import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetActionsCacheRetentionLimitForRepositoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/cache/retention-limit']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetActionsCacheRetentionLimitForRepositoryBody
        | Signal<ActionsSetActionsCacheRetentionLimitForRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetActionsCacheRetentionLimitForRepositoryBody
          | Signal<ActionsSetActionsCacheRetentionLimitForRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/cache/retention-limit`,
          method: 'PUT',
          body,
        }));
    },
  });
