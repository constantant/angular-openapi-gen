import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivitySetThreadSubscriptionBody = NonNullable<
  paths['/notifications/threads/{thread_id}/subscription']['put']['requestBody']
>['content']['application/json'];

export type ActivitySetThreadSubscriptionResponse =
  paths['/notifications/threads/{thread_id}/subscription']['put']['responses']['200']['content']['application/json'];

export const ACTIVITY_SET_THREAD_SUBSCRIPTION = new InjectionToken<
  (
    threadId: string,
    body:
      | ActivitySetThreadSubscriptionBody
      | Signal<ActivitySetThreadSubscriptionBody>,
  ) => ReturnType<typeof httpResource<ActivitySetThreadSubscriptionResponse>>
>('ACTIVITY_SET_THREAD_SUBSCRIPTION');

export function provideActivitySetThreadSubscription(): FactoryProvider {
  return {
    provide: ACTIVITY_SET_THREAD_SUBSCRIPTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        threadId: string,
        body:
          | ActivitySetThreadSubscriptionBody
          | Signal<ActivitySetThreadSubscriptionBody>,
      ) =>
        httpResource<ActivitySetThreadSubscriptionResponse>(() => ({
          url: `${base}/notifications/threads/${threadId}/subscription`,
          method: 'PUT',
          body,
        }));
    },
  };
}
