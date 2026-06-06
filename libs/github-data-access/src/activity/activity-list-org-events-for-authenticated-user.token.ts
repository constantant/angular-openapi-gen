import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListOrgEventsForAuthenticatedUserParams =
  paths['/users/{username}/events/orgs/{org}']['get']['parameters']['query'];

export type ActivityListOrgEventsForAuthenticatedUserResponse =
  paths['/users/{username}/events/orgs/{org}']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      username: string,
      org: string,
      params?:
        | ActivityListOrgEventsForAuthenticatedUserParams
        | (() => ActivityListOrgEventsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActivityListOrgEventsForAuthenticatedUserResponse>
    >
  >('ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER');

export function provideActivityListOrgEventsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        org: string,
        params?:
          | ActivityListOrgEventsForAuthenticatedUserParams
          | (() => ActivityListOrgEventsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<ActivityListOrgEventsForAuthenticatedUserResponse>(() => ({
          url: `${base}/users/${username}/events/orgs/${org}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
