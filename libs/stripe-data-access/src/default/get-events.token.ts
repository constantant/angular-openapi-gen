import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetEventsParams = paths['/v1/events']['get']['parameters']['query'];

export type GetEventsResponse =
  paths['/v1/events']['get']['responses']['200']['content']['application/json'];

export const GET_EVENTS = new InjectionToken<
  (
    params?: GetEventsParams | (() => GetEventsParams | undefined),
  ) => ReturnType<typeof httpResource<GetEventsResponse>>
>('GET_EVENTS');

export function provideGetEvents(): FactoryProvider {
  return {
    provide: GET_EVENTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (params?: GetEventsParams | (() => GetEventsParams | undefined)) =>
        httpResource<GetEventsResponse>(() => ({
          url: `${base}/v1/events`,
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
