import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityGetThreadSubscriptionForAuthenticatedUserResponse =
  paths['/notifications/threads/{thread_id}/subscription']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      threadId: string,
    ) => ReturnType<
      typeof httpResource<ActivityGetThreadSubscriptionForAuthenticatedUserResponse>
    >
  >('ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER');

export function provideActivityGetThreadSubscriptionForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (threadId: string) =>
        httpResource<ActivityGetThreadSubscriptionForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/notifications/threads/${threadId}/subscription`,
          }),
        );
    },
  };
}
