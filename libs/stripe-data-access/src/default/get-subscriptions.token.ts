import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionsParams =
  paths['/v1/subscriptions']['get']['parameters']['query'];

type GetSubscriptionsResponse =
  paths['/v1/subscriptions']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS = new InjectionToken<
  (
    params?: GetSubscriptionsParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionsResponse>>
>('GET_SUBSCRIPTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSubscriptionsParams) =>
      httpResource<GetSubscriptionsResponse>(() => ({
        url: `${base}/v1/subscriptions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
