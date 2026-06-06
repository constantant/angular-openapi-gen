import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListReposWatchedByUserParams =
  paths['/users/{username}/subscriptions']['get']['parameters']['query'];

export type ActivityListReposWatchedByUserResponse =
  paths['/users/{username}/subscriptions']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_REPOS_WATCHED_BY_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListReposWatchedByUserParams
      | (() => ActivityListReposWatchedByUserParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListReposWatchedByUserResponse>>
>('ACTIVITY_LIST_REPOS_WATCHED_BY_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | ActivityListReposWatchedByUserParams
        | (() => ActivityListReposWatchedByUserParams | undefined),
    ) =>
      httpResource<ActivityListReposWatchedByUserResponse>(() => ({
        url: `${base}/users/${username}/subscriptions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
