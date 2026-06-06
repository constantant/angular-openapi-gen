import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListReposStarredByAuthenticatedUserParams =
  paths['/user/starred']['get']['parameters']['query'];

export type ActivityListReposStarredByAuthenticatedUserResponse =
  paths['/user/starred']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | ActivityListReposStarredByAuthenticatedUserParams
        | (() => ActivityListReposStarredByAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActivityListReposStarredByAuthenticatedUserResponse>
    >
  >('ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ActivityListReposStarredByAuthenticatedUserParams
          | (() =>
              | ActivityListReposStarredByAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<ActivityListReposStarredByAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/starred`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
