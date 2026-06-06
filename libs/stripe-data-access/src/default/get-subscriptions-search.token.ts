import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionsSearchParams =
  paths['/v1/subscriptions/search']['get']['parameters']['query'];

type GetSubscriptionsSearchResponse =
  paths['/v1/subscriptions/search']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS_SEARCH = new InjectionToken<
  (
    params?: GetSubscriptionsSearchParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionsSearchResponse>>
>('GET_SUBSCRIPTIONS_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSubscriptionsSearchParams) =>
      httpResource<GetSubscriptionsSearchResponse>(() => ({
        url: `${base}/v1/subscriptions/search`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
