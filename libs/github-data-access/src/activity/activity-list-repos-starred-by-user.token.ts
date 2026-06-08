import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListReposStarredByUserParams =
  paths['/users/{username}/starred']['get']['parameters']['query'];

export type ActivityListReposStarredByUserResponse =
  paths['/users/{username}/starred']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_REPOS_STARRED_BY_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListReposStarredByUserParams
      | (() => ActivityListReposStarredByUserParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListReposStarredByUserResponse>>
>('ACTIVITY_LIST_REPOS_STARRED_BY_USER');

export function provideActivityListReposStarredByUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_REPOS_STARRED_BY_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ActivityListReposStarredByUserParams
          | (() => ActivityListReposStarredByUserParams | undefined),
      ) =>
        httpResource<ActivityListReposStarredByUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/starred`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
