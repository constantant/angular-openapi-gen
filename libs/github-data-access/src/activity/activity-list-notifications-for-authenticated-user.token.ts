import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListNotificationsForAuthenticatedUserParams =
  paths['/notifications']['get']['parameters']['query'];

export type ActivityListNotificationsForAuthenticatedUserResponse =
  paths['/notifications']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | ActivityListNotificationsForAuthenticatedUserParams
        | (() =>
            | ActivityListNotificationsForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ActivityListNotificationsForAuthenticatedUserResponse>
    >
  >('ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER');

export function provideActivityListNotificationsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ActivityListNotificationsForAuthenticatedUserParams
          | (() =>
              | ActivityListNotificationsForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<ActivityListNotificationsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/notifications`,
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
