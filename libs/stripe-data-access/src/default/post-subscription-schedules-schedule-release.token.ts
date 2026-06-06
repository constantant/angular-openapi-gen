import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionSchedulesScheduleReleaseBody = NonNullable<
  paths['/v1/subscription_schedules/{schedule}/release']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionSchedulesScheduleReleaseResponse =
  paths['/v1/subscription_schedules/{schedule}/release']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_SCHEDULES_SCHEDULE_RELEASE = new InjectionToken<
  (
    schedule: string,
    body:
      | PostSubscriptionSchedulesScheduleReleaseBody
      | Signal<PostSubscriptionSchedulesScheduleReleaseBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionSchedulesScheduleReleaseResponse>
  >
>('POST_SUBSCRIPTION_SCHEDULES_SCHEDULE_RELEASE');

export function providePostSubscriptionSchedulesScheduleRelease(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTION_SCHEDULES_SCHEDULE_RELEASE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        schedule: string,
        body:
          | PostSubscriptionSchedulesScheduleReleaseBody
          | Signal<PostSubscriptionSchedulesScheduleReleaseBody>,
      ) =>
        httpResource<PostSubscriptionSchedulesScheduleReleaseResponse>(() => ({
          url: `${base}/v1/subscription_schedules/${schedule}/release`,
          method: 'POST',
          body,
        }));
    },
  };
}
