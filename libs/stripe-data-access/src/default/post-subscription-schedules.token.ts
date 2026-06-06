import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostSubscriptionSchedulesBody = NonNullable<
  paths['/v1/subscription_schedules']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostSubscriptionSchedulesResponse =
  paths['/v1/subscription_schedules']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTION_SCHEDULES = new InjectionToken<
  (
    body: PostSubscriptionSchedulesBody | Signal<PostSubscriptionSchedulesBody>,
  ) => ReturnType<typeof httpResource<PostSubscriptionSchedulesResponse>>
>('POST_SUBSCRIPTION_SCHEDULES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostSubscriptionSchedulesBody
        | Signal<PostSubscriptionSchedulesBody>,
    ) =>
      httpResource<PostSubscriptionSchedulesResponse>(() => ({
        url: `${base}/v1/subscription_schedules`,
        method: 'POST',
        body,
      }));
  },
});
