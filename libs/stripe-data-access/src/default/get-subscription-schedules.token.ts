import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionSchedulesParams =
  paths['/v1/subscription_schedules']['get']['parameters']['query'];

type GetSubscriptionSchedulesResponse =
  paths['/v1/subscription_schedules']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_SCHEDULES = new InjectionToken<
  (
    params?: GetSubscriptionSchedulesParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionSchedulesResponse>>
>('GET_SUBSCRIPTION_SCHEDULES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSubscriptionSchedulesParams) =>
      httpResource<GetSubscriptionSchedulesResponse>(() => ({
        url: `${base}/v1/subscription_schedules`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
