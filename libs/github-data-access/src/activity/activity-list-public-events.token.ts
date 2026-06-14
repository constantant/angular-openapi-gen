import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIVITY_LIST_PUBLIC_EVENTS');

export function provideActivityListPublicEvents(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_PUBLIC_EVENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ActivityListPublicEventsParams
          | (() => ActivityListPublicEventsParams | undefined),
      ) =>
        httpResource<ActivityListPublicEventsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/events`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
