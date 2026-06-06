import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListReceivedPublicEventsForUserParams =
  paths['/users/{username}/received_events/public']['get']['parameters']['query'];

export type ActivityListReceivedPublicEventsForUserResponse =
  paths['/users/{username}/received_events/public']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_RECEIVED_PUBLIC_EVENTS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListReceivedPublicEventsForUserParams
      | (() => ActivityListReceivedPublicEventsForUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActivityListReceivedPublicEventsForUserResponse>
  >
>('ACTIVITY_LIST_RECEIVED_PUBLIC_EVENTS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | ActivityListReceivedPublicEventsForUserParams
        | (() => ActivityListReceivedPublicEventsForUserParams | undefined),
    ) =>
      httpResource<ActivityListReceivedPublicEventsForUserResponse>(() => ({
        url: `${base}/users/${username}/received_events/public`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
