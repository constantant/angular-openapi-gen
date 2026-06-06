import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetEventsIdParams = paths['/v1/events/{id}']['get']['parameters']['query'];

type GetEventsIdResponse =
  paths['/v1/events/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_EVENTS_ID = new InjectionToken<
  (
    id: string,
    params?: GetEventsIdParams,
  ) => ReturnType<typeof httpResource<GetEventsIdResponse>>
>('GET_EVENTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetEventsIdParams) =>
      httpResource<GetEventsIdResponse>(() => ({
        url: `${base}/v1/events/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
