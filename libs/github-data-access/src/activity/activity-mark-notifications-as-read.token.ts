import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityMarkNotificationsAsReadBody = NonNullable<
  paths['/notifications']['put']['requestBody']
>['content']['application/json'];

export type ActivityMarkNotificationsAsReadResponse =
  paths['/notifications']['put']['responses']['202']['content']['application/json'];

export const ACTIVITY_MARK_NOTIFICATIONS_AS_READ = new InjectionToken<
  (
    body:
      | ActivityMarkNotificationsAsReadBody
      | Signal<ActivityMarkNotificationsAsReadBody>,
  ) => ReturnType<typeof httpResource<ActivityMarkNotificationsAsReadResponse>>
>('ACTIVITY_MARK_NOTIFICATIONS_AS_READ');

export function provideActivityMarkNotificationsAsRead(): FactoryProvider {
  return {
    provide: ACTIVITY_MARK_NOTIFICATIONS_AS_READ,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | ActivityMarkNotificationsAsReadBody
          | Signal<ActivityMarkNotificationsAsReadBody>,
      ) =>
        httpResource<ActivityMarkNotificationsAsReadResponse>(() => ({
          url: `${base}/notifications`,
          method: 'PUT',
          body,
        }));
    },
  };
}
