import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListPublicOrgEventsParams =
  paths['/orgs/{org}/events']['get']['parameters']['query'];

export type ActivityListPublicOrgEventsResponse =
  paths['/orgs/{org}/events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_PUBLIC_ORG_EVENTS = new InjectionToken<
  (
    org: string,
    params?:
      | ActivityListPublicOrgEventsParams
      | (() => ActivityListPublicOrgEventsParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListPublicOrgEventsResponse>>
>('ACTIVITY_LIST_PUBLIC_ORG_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | ActivityListPublicOrgEventsParams
        | (() => ActivityListPublicOrgEventsParams | undefined),
    ) =>
      httpResource<ActivityListPublicOrgEventsResponse>(() => ({
        url: `${base}/orgs/${org}/events`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
