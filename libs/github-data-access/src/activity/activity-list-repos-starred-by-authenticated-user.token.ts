import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
  >('ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER');

export function provideActivityListReposStarredByAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ActivityListReposStarredByAuthenticatedUserParams
          | (() =>
              | ActivityListReposStarredByAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<ActivityListReposStarredByAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/starred`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
