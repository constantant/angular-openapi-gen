import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSubscriptionSchedulesScheduleParams =
  paths['/v1/subscription_schedules/{schedule}']['get']['parameters']['query'];

type GetSubscriptionSchedulesScheduleResponse =
  paths['/v1/subscription_schedules/{schedule}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_SCHEDULES_SCHEDULE = new InjectionToken<
  (
    schedule: string,
    params?: GetSubscriptionSchedulesScheduleParams,
  ) => ReturnType<typeof httpResource<GetSubscriptionSchedulesScheduleResponse>>
>('GET_SUBSCRIPTION_SCHEDULES_SCHEDULE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      schedule: string,
      params?: GetSubscriptionSchedulesScheduleParams,
    ) =>
      httpResource<GetSubscriptionSchedulesScheduleResponse>(() => ({
        url: `${base}/v1/subscription_schedules/${schedule}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
