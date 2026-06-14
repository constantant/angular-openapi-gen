import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListReceivedEventsForUserParams =
  paths['/users/{username}/received_events']['get']['parameters']['query'];

export type ActivityListReceivedEventsForUserResponse =
  paths['/users/{username}/received_events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListReceivedEventsForUserParams
      | (() => ActivityListReceivedEventsForUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActivityListReceivedEventsForUserResponse>
  >
>('ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER');

export function provideActivityListReceivedEventsForUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ActivityListReceivedEventsForUserParams
          | (() => ActivityListReceivedEventsForUserParams | undefined),
      ) =>
        httpResource<ActivityListReceivedEventsForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/received_events`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
