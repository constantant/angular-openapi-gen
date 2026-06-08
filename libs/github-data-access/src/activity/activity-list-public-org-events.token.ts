import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIVITY_LIST_PUBLIC_ORG_EVENTS');

export function provideActivityListPublicOrgEvents(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_PUBLIC_ORG_EVENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActivityListPublicOrgEventsParams
          | (() => ActivityListPublicOrgEventsParams | undefined),
      ) =>
        httpResource<ActivityListPublicOrgEventsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/events`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
