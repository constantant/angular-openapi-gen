import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionSchedulesScheduleBody = NonNullable<
  paths['/v1/subscription_schedules/{schedule}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionSchedulesScheduleResponse =
  paths['/v1/subscription_schedules/{schedule}']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_SCHEDULES_SCHEDULE = new InjectionToken<
  (
    schedule: string,
    body:
      | PostSubscriptionSchedulesScheduleBody
      | Signal<PostSubscriptionSchedulesScheduleBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionSchedulesScheduleResponse>
  >
>('POST_SUBSCRIPTION_SCHEDULES_SCHEDULE');

export function providePostSubscriptionSchedulesSchedule(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTION_SCHEDULES_SCHEDULE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        schedule: string,
        body:
          | PostSubscriptionSchedulesScheduleBody
          | Signal<PostSubscriptionSchedulesScheduleBody>,
      ) =>
        httpResource<PostSubscriptionSchedulesScheduleResponse>(() => ({
          url: `${base}/v1/subscription_schedules/${schedule}`,
          method: 'POST',
          body,
        }));
    },
  };
}
