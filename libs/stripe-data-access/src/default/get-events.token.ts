import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetEventsParams = paths['/v1/events']['get']['parameters']['query'];

type GetEventsResponse =
  paths['/v1/events']['get']['responses']['200']['content']['application/json'];

export const GET_EVENTS = new InjectionToken<
  (
    params?: GetEventsParams,
  ) => ReturnType<typeof httpResource<GetEventsResponse>>
>('GET_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetEventsParams) =>
      httpResource<GetEventsResponse>(() => ({
        url: `${base}/v1/events`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
