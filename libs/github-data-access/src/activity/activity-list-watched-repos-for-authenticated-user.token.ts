import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListWatchedReposForAuthenticatedUserParams =
  paths['/user/subscriptions']['get']['parameters']['query'];

export type ActivityListWatchedReposForAuthenticatedUserResponse =
  paths['/user/subscriptions']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | ActivityListWatchedReposForAuthenticatedUserParams
        | (() =>
            | ActivityListWatchedReposForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActivityListWatchedReposForAuthenticatedUserResponse>
    >
  >('ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER');

export function provideActivityListWatchedReposForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ActivityListWatchedReposForAuthenticatedUserParams
          | (() =>
              | ActivityListWatchedReposForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<ActivityListWatchedReposForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/subscriptions`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
