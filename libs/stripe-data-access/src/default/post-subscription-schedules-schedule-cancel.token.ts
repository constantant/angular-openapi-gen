import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionSchedulesScheduleCancelBody = NonNullable<
  paths['/v1/subscription_schedules/{schedule}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionSchedulesScheduleCancelResponse =
  paths['/v1/subscription_schedules/{schedule}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_SCHEDULES_SCHEDULE_CANCEL = new InjectionToken<
  (
    schedule: string,
    body:
      | PostSubscriptionSchedulesScheduleCancelBody
      | Signal<PostSubscriptionSchedulesScheduleCancelBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionSchedulesScheduleCancelResponse>
  >
>('POST_SUBSCRIPTION_SCHEDULES_SCHEDULE_CANCEL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      schedule: string,
      body:
        | PostSubscriptionSchedulesScheduleCancelBody
        | Signal<PostSubscriptionSchedulesScheduleCancelBody>,
    ) =>
      httpResource<PostSubscriptionSchedulesScheduleCancelResponse>(() => ({
        url: `${base}/v1/subscription_schedules/${schedule}/cancel`,
        method: 'POST',
        body,
      }));
  },
});
