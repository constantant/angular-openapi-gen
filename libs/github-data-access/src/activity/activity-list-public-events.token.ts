import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListPublicEventsParams =
  paths['/events']['get']['parameters']['query'];

export type ActivityListPublicEventsResponse =
  paths['/events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_PUBLIC_EVENTS = new InjectionToken<
  (
    params?:
      | ActivityListPublicEventsParams
      | (() => ActivityListPublicEventsParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListPublicEventsResponse>>
>('ACTIVITY_LIST_PUBLIC_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | ActivityListPublicEventsParams
        | (() => ActivityListPublicEventsParams | undefined),
    ) =>
      httpResource<ActivityListPublicEventsResponse>(() => ({
        url: `${base}/events`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
