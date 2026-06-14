import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER');

export function provideActivityListPublicEventsForUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ActivityListPublicEventsForUserParams
          | (() => ActivityListPublicEventsForUserParams | undefined),
      ) =>
        httpResource<ActivityListPublicEventsForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/events/public`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
