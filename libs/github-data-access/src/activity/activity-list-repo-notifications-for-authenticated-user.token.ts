import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListRepoNotificationsForAuthenticatedUserParams =
  paths['/repos/{owner}/{repo}/notifications']['get']['parameters']['query'];

export type ActivityListRepoNotificationsForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/notifications']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | ActivityListRepoNotificationsForAuthenticatedUserParams
        | (() =>
            | ActivityListRepoNotificationsForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActivityListRepoNotificationsForAuthenticatedUserResponse>
    >
  >('ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER');

export function provideActivityListRepoNotificationsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActivityListRepoNotificationsForAuthenticatedUserParams
          | (() =>
              | ActivityListRepoNotificationsForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<ActivityListRepoNotificationsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/notifications`,
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
