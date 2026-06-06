import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionSchedulesScheduleParams =
  paths['/v1/subscription_schedules/{schedule}']['get']['parameters']['query'];

export type GetSubscriptionSchedulesScheduleResponse =
  paths['/v1/subscription_schedules/{schedule}']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTION_SCHEDULES_SCHEDULE = new InjectionToken<
  (
    schedule: string,
    params?:
      | GetSubscriptionSchedulesScheduleParams
      | (() => GetSubscriptionSchedulesScheduleParams | undefined),
  ) => ReturnType<typeof httpResource<GetSubscriptionSchedulesScheduleResponse>>
>('GET_SUBSCRIPTION_SCHEDULES_SCHEDULE');

export function provideGetSubscriptionSchedulesSchedule(): FactoryProvider {
  return {
    provide: GET_SUBSCRIPTION_SCHEDULES_SCHEDULE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        schedule: string,
        params?:
          | GetSubscriptionSchedulesScheduleParams
          | (() => GetSubscriptionSchedulesScheduleParams | undefined),
      ) =>
        httpResource<GetSubscriptionSchedulesScheduleResponse>(() => ({
          url: `${base}/v1/subscription_schedules/${schedule}`,
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
