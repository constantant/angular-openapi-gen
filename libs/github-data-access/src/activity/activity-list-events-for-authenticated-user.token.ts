import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListEventsForAuthenticatedUserParams =
  paths['/users/{username}/events']['get']['parameters']['query'];

export type ActivityListEventsForAuthenticatedUserResponse =
  paths['/users/{username}/events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListEventsForAuthenticatedUserParams
      | (() => ActivityListEventsForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActivityListEventsForAuthenticatedUserResponse>
  >
>('ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER');

export function provideActivityListEventsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ActivityListEventsForAuthenticatedUserParams
          | (() => ActivityListEventsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<ActivityListEventsForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/events`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
