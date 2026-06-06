import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListPublicEventsForUserParams =
  paths['/users/{username}/events/public']['get']['parameters']['query'];

export type ActivityListPublicEventsForUserResponse =
  paths['/users/{username}/events/public']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ActivityListPublicEventsForUserParams
      | (() => ActivityListPublicEventsForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListPublicEventsForUserResponse>>
>('ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | ActivityListPublicEventsForUserParams
        | (() => ActivityListPublicEventsForUserParams | undefined),
    ) =>
      httpResource<ActivityListPublicEventsForUserResponse>(() => ({
        url: `${base}/users/${username}/events/public`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
